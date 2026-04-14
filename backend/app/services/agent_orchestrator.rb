class AgentOrchestrator
  def self.project_created(project)
    PlannerAgent.new(project).call(project.description)
  end

  def self.task_completed(task)
   # add other agents here as needed, e.g. CodeAgent to generate code based on completed task
  end
end