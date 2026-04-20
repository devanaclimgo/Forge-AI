class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    tasks = current_user.projects
      .find(params[:project_id])
      .tasks
      .includes(:sprint)
    render json: tasks
  end

  def show
    render json: @task
  end

  def create
    task = current_project.tasks.create!(task_params)
    render json: task, status: :created
  end

  def update
    previous_status = @task.status
    @task.update!(task_params)

    if previous_status != "done" && @task.status == "done"
      AgentOrchestrator.task_completed(@task)
    end

    render json: @task
  end

  def destroy
    @task.destroy!
    head :no_content
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def current_project
    current_user.projects.find(params[:project_id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :status, :priority, :category, :sprint_id)
  end
end