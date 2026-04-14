class Api::V1::TasksController < ApplicationController
  def update
    task = Task.find(params[:id])

    task.update!(task_params)

    if task.status == "done"
      AgentOrchestrator.task_completed(task)
    end

    render json: task
  end
end
