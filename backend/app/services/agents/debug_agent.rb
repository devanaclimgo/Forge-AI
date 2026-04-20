module Agents
  class DebugAgent < BaseAgent
    def call(task)
      response = Ai::StratusClient.generate(
        build_prompt(task),
        system: "You are a QA engineer and debugger inside Forge AI. Be direct and structured."
      )

      log("debug", { task_id: task.id, title: task.title }, response)
      response
    end

    private

    def build_prompt(task)
      <<~PROMPT
        A task was marked as done but flagged for QA review.

        Task: #{task.title}
        Description: #{task.description}
        Priority: #{task.priority}
        Category: #{task.category}

        Provide:
        1. Possible edge cases that should be tested
        2. Reproduction steps for potential bugs
        3. A short QA checklist before closing this task
      PROMPT
    end
  end
end