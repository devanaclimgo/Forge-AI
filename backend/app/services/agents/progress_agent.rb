module Agents
  class ProgressAgent < BaseAgent
    def call
      stats   = build_stats
      response = Ai::StratusClient.generate(
        build_prompt(stats),
        system: "You are a project progress analyst inside Forge AI. Be concise and actionable."
      )

      log("progress", stats, response)
      response
    end

    private

    def build_stats
      tasks      = @project.tasks
      total      = tasks.count
      done       = tasks.where(status: "done").count
      in_progress = tasks.where(status: "in_progress").count
      pending    = tasks.where(status: "pending").count

      {
        total:       total,
        done:        done,
        in_progress: in_progress,
        pending:     pending,
        completion:  total > 0 ? (done.to_f / total * 100).round(1) : 0
      }
    end

    def build_prompt(stats)
      <<~PROMPT
        Analyze the current progress of this project.

        Project: #{@project.name}
        Description: #{@project.description}

        Current stats:
        - Total tasks: #{stats[:total]}
        - Done: #{stats[:done]}
        - In progress: #{stats[:in_progress]}
        - Pending: #{stats[:pending]}
        - Completion: #{stats[:completion]}%

        Provide:
        1. Current project health assessment
        2. Bottlenecks or risks based on the numbers
        3. Suggested focus for the next sprint
        4. Adjusted timeline estimate if needed
      PROMPT
    end
  end
end