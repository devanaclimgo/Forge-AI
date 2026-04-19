module Agents
  class PlannerAgent < BaseAgent
    def call(description)
      prompt = build_prompt(description)

      response = Ai::StratusClient.generate(
        prompt,
        system: "You are a senior software project planner. Be consice and structured."
      )

      log("planner", { description: description }, response)

      response
    end

    private

    def build_prompt(description)
      <<~PROMPT
        You are a senior software project planner...

        Project:
        #{description}
      PROMPT
    end
  end
end