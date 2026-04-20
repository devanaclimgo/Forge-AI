class MakeSprintOptionalOnTasks < ActiveRecord::Migration[8.1]
  def change
    change_column_null :tasks, :sprint_id, true
  end
end