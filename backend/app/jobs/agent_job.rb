class AgentJob < ApplicationJob
  queue_as :agents

  def perform(project_id, agent_name = "planner")
    project = Project.find(project_id)

    result = case agent_name
    when "planner"
      Agents::PlannerAgent.new(project).call(project.description)
    end

    ActionCable.server.broadcast(
      "agent_status_#{project_id}",
      {
        status: "completed",
        agent:  agent_name,
        result: result[:result],
        confidence: result[:confidence]
      }
    )

  rescue => e
    ActionCable.server.broadcast(
      "agent_status_#{project_id}",
      { status: "failed", agent: agent_name, error: e.message }
    )
  end
end