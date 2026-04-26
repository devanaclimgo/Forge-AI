class Api::V1::SprintsController < ApplicationController
  def index
    project = current_user.projects.find(params[:project_id])
    sprints = project.sprints.includes(:tasks)

    render json: sprints.map { |s|
      {
        id:        s.id,
        name:      s.name,
        start_date: s.start_date,
        end_date:   s.end_date,
        tasks:     s.tasks.size,
        completed: s.tasks.count { |t| t.status == "done" },
        status:    sprint_status(s)
      }
    }
  end

  def create
    project = current_user.projects.find(params[:project_id])
    sprint  = project.sprints.create!(sprint_params)
    render json: sprint, status: :created
  end

  private

  def sprint_params
    params.require(:sprint).permit(:name, :start_date, :end_date)
  end

  def sprint_status(sprint)
    return "completed" if sprint.end_date && sprint.end_date < Date.today
    return "active"    if sprint.start_date && sprint.start_date <= Date.today
    "planned"
  end
end