class TasksController < ApplicationController
  def index
    render json: project.tasks
  end
end
