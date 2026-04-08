class Orchestrator::RunAgents
  def initialize(project)
    @project = project
  end

  def call(input)
    Agents::PoAgent.new(@project).call(input)
    Agents::BackendAgent.new(@project).call
    Agents::FrontendAgent.new(@project).call
    Agents::QaAgent.new(@project).call

    Agents::CostAgent.new.analyze(@project)
  end
end