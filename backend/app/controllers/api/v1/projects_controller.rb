class Api::V1::ProjectsController < ApplicationController
  def create
    project = current_user.projects.create!(project_params)

    AgentOrchestrator.project_created(project)

    render json: project
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :visibility)
  end
end