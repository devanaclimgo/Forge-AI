class Agents::BackendAgent
  def initialize(project)
    @project = project
  end

  def call
    tasks = @project.tasks.where(created_by_agent: "po_agent")

    tasks.each do |task|
      decision = build_decision(task)

      task.update!(
        technical_details: decision[:technical],
        decision_context: decision[:decision]
      )
    end

    create_log(tasks.count)
  end

  private

  def build_decision(task)
    case task.title.downcase
    when /authentication/
      authentication_decision
    when /expense/
      expense_decision
    when /dashboard/
      dashboard_decision
    else
      generic_decision(task)
    end
  end

  # 🔐 AUTH
  def authentication_decision
    {
      technical: {
        models: ["User"],
        endpoints: [
          { method: "POST", path: "/signup" },
          { method: "POST", path: "/login" }
        ]
      },
      decision: {
        choice: "JWT Authentication",
        reason: "Stateless and scalable for APIs",
        tradeoffs: [
          "Harder to revoke tokens",
          "Requires secure storage on frontend"
        ],
        impact: "Simplifies backend session management"
      }
    }
  end

  # 💸 EXPENSE
  def expense_decision
    {
      technical: {
        models: ["Expense"],
        endpoints: [
          { method: "GET", path: "/expenses" },
          { method: "POST", path: "/expenses" },
          { method: "PATCH", path: "/expenses/:id" },
          { method: "DELETE", path: "/expenses/:id" }
        ],
        relations: ["Expense belongs_to User"]
      },
      decision: {
        choice: "RESTful CRUD design",
        reason: "Simple and predictable structure",
        tradeoffs: [
          "Less flexible than GraphQL",
          "More endpoints to manage"
        ],
        impact: "Faster development and easier maintenance"
      }
    }
  end

  # 📊 DASHBOARD
  def dashboard_decision
    {
      technical: {
        endpoints: [
          { method: "GET", path: "/dashboard" }
        ]
      },
      decision: {
        choice: "Aggregated endpoint",
        reason: "Reduces number of frontend requests",
        tradeoffs: [
          "Heavier backend processing",
          "Less granular control"
        ],
        impact: "Improves frontend performance"
      }
    }
  end

  # 🧠 GENERIC
  def generic_decision(task)
    {
      technical: {
        endpoints: [
          { method: "GET", path: "/#{task.title.parameterize.pluralize}" }
        ]
      },
      decision: {
        choice: "Auto-generated REST endpoint",
        reason: "Fallback for undefined structures",
        tradeoffs: [
          "May not be optimal",
          "Generic naming"
        ],
        impact: "Ensures system completeness"
      }
    }
  end

  def create_log(task_count)
    @project.agent_logs.create!(
      agent_name: "backend_agent",
      action: "generated_backend_decisions",
      metadata: {
        tasks_processed: task_count
      },
      cost: task_count * 0.015
    )
  end
end