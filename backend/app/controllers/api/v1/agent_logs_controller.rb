# app/controllers/api/v1/agent_logs_controller.rb
class Api::V1::AgentLogsController < ApplicationController
  def index
    logs = current_user.projects
                       .includes(:agent_logs)
                       .flat_map(&:agent_logs)
                       .sort_by(&:created_at)
                       .reverse
                       .first(10)

    render json: logs.map { |log|
      {
        id: log.id,
        agent_name: log.agent_name,
        project_name: log.project.name,
        input: log.input,
        created_at: log.created_at
      }
    }
  end
end