class RunAgentsJob
  include Sidekiq::Job

  def perform(project_id, input)
    project = Project.find(project_id)
    Orchestrator::RunAgents.new(project).call(input)
  end
end