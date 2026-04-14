class CreateAgentLogs < ActiveRecord::Migration[8.1]
  def change
    create_table :agent_logs do |t|
      t.references :project, null: false, foreign_key: true
      t.string :agent_name
      t.jsonb :input
      t.jsonb :output

      t.timestamps
    end
  end
end
