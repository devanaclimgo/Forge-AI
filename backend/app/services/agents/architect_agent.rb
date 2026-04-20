module Agents
  class ArchitectAgent < BaseAgent
    def call(description)
      response = Ai::StratusClient.generate(
        build_prompt(description),
        system: "You are a software architect inside Forge AI. Focus on practical decisions."
      )

      log("architect", { description: description }, response)
      response
    end

    private

    def build_prompt(description)
      <<~PROMPT
        Define the technical architecture for this project.

        Project: #{description}

        Provide:
        1. Recommended tech stack with justification
        2. System structure (frontend / backend / services)
        3. Key architectural decisions (e.g. "use Redis here", "separate service X")
        4. Potential technical risks
      PROMPT
    end
  end
end