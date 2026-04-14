class BaseAgent
  def initialize(project)
    @project = project
  end

  def log(agent_name, input, output)
    AgentLog.create!(
      project: @project,
      agent_name: agent_name,
      input: input,
      output: output
    )
  end
end