class CreateAgentLogs < ActiveRecord::Migration[8.1]
  def change
    create_table :agent_logs do |t|
      t.string :agent_name
      t.string :action
      t.jsonb :metadata
      t.decimal :cost
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
