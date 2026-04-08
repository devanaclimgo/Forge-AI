class Agents::PoAgent
  def initialize(project)
    @project = project
  end

  def call(input)
    tasks_data = mock_tasks(input)

    created_tasks = tasks_data.map do |task|
      @project.tasks.create!(
        title: task[:title],
        description: task[:description],
        status: "backlog",
        priority: task[:priority],
        created_by_agent: "po_agent",
        cost_estimate: task[:cost_estimate]
      )
    end

    create_log(created_tasks.count)

    created_tasks
  end

  private

  def mock_tasks(input)
    [
      {
        title: "User authentication system",
        description: "Implement sign up, login, and JWT authentication",
        priority: "high",
        cost_estimate: 0.02
      },
      {
        title: "Expense tracking CRUD",
        description: "Allow users to create, read, update and delete expenses",
        priority: "high",
        cost_estimate: 0.03
      },
      {
        title: "Dashboard overview",
        description: "Display monthly expenses and summaries",
        priority: "medium",
        cost_estimate: 0.015
      },
      {
        title: "Bank statement import",
        description: "Upload and parse financial statements",
        priority: "medium",
        cost_estimate: 0.025
      },
      {
        title: "Notifications system",
        description: "Alert users about unusual spending",
        priority: "low",
        cost_estimate: 0.01
      }
    ]
  end

  def create_log(task_count)
    @project.agent_logs.create!(
      agent_name: "po_agent",
      action: "created_tasks",
      metadata: {
        tasks_created: task_count
      },
      cost: estimated_cost(task_count)
    )
  end

  def estimated_cost(task_count)
    task_count * 0.01
  end
end