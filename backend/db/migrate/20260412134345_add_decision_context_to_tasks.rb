class AddDecisionContextToTasks < ActiveRecord::Migration[8.1]
  def change
    add_column :tasks, :decision_context, :jsonb
  end
end
