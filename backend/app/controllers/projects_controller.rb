class ProjectsController < ApplicationController
  def create
    project = current_user.projects.create!(project_params)
    render json: project
  end
end
