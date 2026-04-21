class Api::V1::AgentTestController < ApplicationController
  def create
    prompt = params[:prompt]
    agent  = params[:agent] || "planner"

    return render json: { error: "prompt is required" }, status: :unprocessable_entity if prompt.blank?

    result = Ai::StratusClient.generate(
      prompt,
      system: system_prompt_for(agent)
    )

    render json: {
      result: result[:result],
      confidence: result[:confidence],
      planning_ms: result[:planning_ms],
      agent: agent
    }
  end

  private

  def system_prompt_for(agent)
    {
      "planner"     => "You are a senior software project planner inside Forge AI. Break the idea into features, sprints and priorities. Be structured and actionable.",
      "architect"   => "You are a software architect inside Forge AI. Define the technical stack, system structure and key architectural decisions. Be practical and direct.",
      "taskmanager" => "You are a technical project manager inside Forge AI. Organize and prioritize tasks based on the context given. Focus on what moves the needle.",
      "debug"       => "You are a QA engineer and debugger inside Forge AI. Analyze the problem, suggest causes, reproduction steps and a fix checklist."
    }[agent] || "You are a helpful AI assistant inside Forge AI."
  end
end