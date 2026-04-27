class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy]

  def index
    projects = current_user.projects.includes(:tasks, :sprints)
    render json: projects.map { |p| project_json(p) }
  end

  def show
    render json: project_json(@project)
  end

  def create
    project = current_user.projects.create!(project_params)
    AgentOrchestrator.project_created(project)
    render json: project_json(project), status: :created
  end

  def update
    @project.update!(project_params)
    render json: project_json(@project)
  end

  def destroy
    @project.destroy!
    head :no_content
  end

  private
  def set_project
    @project = current_user.projects.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description, :visibility, :summary)
  end

  def project_json(project)
    total_tasks = project.tasks.size
    done_tasks  = project.tasks.count { |t| t.status == "done" }
    progress    = total_tasks > 0 ? (done_tasks.to_f / total_tasks * 100).round : 0

    {
      id:                 project.id,
      name:               project.name,
      description:        project.description,
      summary:            project.summary,
      visibility:         project.visibility,
      progress:           progress,
      tasks_completed:    done_tasks,
      total_tasks:        total_tasks,
      active_sprint:      project.sprints.find { |s| s.name }&.name,
      created_at:         project.created_at,
      updated_at:         project.updated_at
    }
  end
end