class AgentOrchestrator
  def self.project_created(project)
    AgentJob.perform_later(project.id, "planner")
    AgentJob.perform_later(project.id, "architect")
  end

  def self.task_completed(task)
    AgentJob.perform_later(task.project_id, "debug", task.id)
    AgentJob.perform_later(task.project_id, "progress")
  end
end