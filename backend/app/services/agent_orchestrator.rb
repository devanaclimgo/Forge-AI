class AgentOrchestrator
  def self.project_created(project)
    AgentJob.perform_later(project.id, "planner")
  end

  def self.task_completed(task)
   # add other agents here as needed, e.g. CodeAgent to generate code based on completed task
  end
end