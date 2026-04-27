module Agents
  class PlannerAgent < BaseAgent
    def call(description)
      prompt = build_prompt(description)

      response = Ai::StratusClient.generate(
        prompt,
        system: "You are a senior software project planner. Be concise and structured.", max_tokens: 2000
      )

      log("planner", { description: description[0..200] }, response)

      TaskGeneratorAgent.new(@project).call(response[:result])

      response
    end

    private

    def build_prompt(description)
      <<~PROMPT
        You are a senior software project planner.

        Create a detailed project plan for:
        #{description}
        
        Include: features breakdown, sprint structure, task priorities.
      PROMPT
    end
  end
end