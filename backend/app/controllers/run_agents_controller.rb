class RunAgentsController < ApplicationController
  def create
    project = Project.find(params[:project_id])

    RunAgentsJob.perform_async(project.id, params[:input])

    render json: { status: "agents_running" }
  end
end
