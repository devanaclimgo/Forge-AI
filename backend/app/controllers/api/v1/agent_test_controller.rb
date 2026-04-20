class Api::V1::AgentTestController < ApplicationController
  def create
    prompt = params[:prompt]
    agent  = params[:agent] || "planner"

    result = Ai::StratusClient.generate(
      prompt,
      system: system_prompt_for(agent)
    )

    render json: {
      result:     result[:result],
      confidence: result[:confidence],
      planning_ms: result[:planning_ms]
    }
  end

  private

  def system_prompt_for(agent)
    {
      "planner"     => "You are a senior software project planner. Break the idea into features, sprints and priorities.",
      "architect"   => "You are a software architect. Define the technical stack, system structure and key architectural decisions.",
      "taskmanager" => "You are a technical project manager. Organize and prioritize tasks based on the context given.",
      "debug"       => "You are a QA engineer and debugger. Analyze the problem, suggest causes, reproduction steps and fix checklist."
    }[agent] || "You are a helpful AI assistant inside Forge AI."
  end
end