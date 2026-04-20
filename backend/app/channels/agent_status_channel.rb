class AgentStatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from "agent_status_#{params[:project_id]}"
  end

  def unsubscribed
    stop_all_streams
  end
end