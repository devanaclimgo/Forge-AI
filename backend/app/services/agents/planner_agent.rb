class PlannerAgent < BaseAgent
  def call(description)
    prompt = build_prompt(description)

    response = StratusClient.generate(prompt)

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