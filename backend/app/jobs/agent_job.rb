class AgentJob < ApplicationJob
  queue_as :agents

  def perform(project_id, agent_name, task_id = nil)
    project = Project.find(project_id)
    task = task_id ? Task.find(task_id) : nil

    result = case agent_name
    when "planner"
      result = Agents::PlannerAgent.new(project).call(project.description)
      Agents::TaskGeneratorAgent.new(project).call(result[:result])
      result
    when "architect"
      result = Agents::ArchitectAgent.new(project).call(project.description)
      Agents::TaskGeneratorAgent.new(project).call(result[:result])
      result
    when "debug"
      result = Agents::DebugAgent.new(project).call(task)
      Agents::TaskGeneratorAgent.new(project).call(result[:result])
      result
    when "progress"
      result = Agents::ProgressAgent.new(project).call
      Agents::TaskGeneratorAgent.new(project).call(result[:result])
      result
    end

    ActionCable.server.broadcast(
      "agent_status_#{project_id}",
      {
        status: "completed",
        agent: agent_name,
        result: result[:result],
        confidence: result[:confidence],
        task_id: task_id
      }
    )

  rescue => e
    ActionCable.server.broadcast(
      "agent_status_#{project_id}",
      { status: "failed", agent: agent_name, error: e.message }
    )
  end
end