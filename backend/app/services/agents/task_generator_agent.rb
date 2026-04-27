module Agents
  class TaskGeneratorAgent < BaseAgent
    def call(planner_output)
      response = Ai::StratusClient.generate(
        build_prompt(planner_output),
        system: "You are a JSON generator. You ONLY return valid JSON, no markdown, no explanation.",
        max_tokens: 2000
      )

      parsed = JSON.parse(response[:result].gsub(/```json|```/, "").strip)

      def create_sprints_and_tasks(parsed)
        @project.update!(
          name: parsed["project_name"] || @project.name,
          summary: parsed["project_summary"] || ""
        )
      end

      log("task_generator", { planner_output: planner_output[0..200] }, parsed)
      parsed
    rescue JSON::ParserError => e
      log("task_generator", { error: e.message }, {})
      {}
    end

    private

    def build_prompt(planner_output)
      <<~PROMPT
        Based on this project plan, generate a JSON with sprints and tasks.

        Plan:
        #{planner_output}

        Return ONLY this JSON structure, nothing else:
        {
          "project_name": "short project name (max 40 chars)",
          "project_summary": "one sentence describing what this project does",
          "sprints": [
            {
              "name": "Sprint 1",
              "tasks": [
                {
                  "title": "task title",
                  "description": "what needs to be done",
                  "priority": "high",
                  "status": "todo",
                  "category": "backend"
                }
              ]
            }
          ]
        }

        Rules:
        - priority must be: low, medium, high, or critical
        - status must be: todo
        - max 3 sprints
        - max 6 tasks per sprint
        - category examples: backend, frontend, design, devops, testing
      PROMPT
    end

    def create_sprints_and_tasks(parsed)
      return unless parsed["sprints"].is_a?(Array)

      parsed["sprints"].each do |sprint_data|
        sprint = @project.sprints.create!(
          name:       sprint_data["name"],
          start_date: Date.today,
          end_date:   Date.today + 14
        )

        next unless sprint_data["tasks"].is_a?(Array)

        sprint_data["tasks"].each do |task_data|
          @project.tasks.create!(
            title:       task_data["title"],
            description: task_data["description"],
            priority:    task_data["priority"] || "medium",
            status:      "todo",
            category:    task_data["category"],
            sprint:      sprint
          )
        end
      end
    end
  end
end