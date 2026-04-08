class CreateCostRecords < ActiveRecord::Migration[8.1]
  def change
    create_table :cost_records do |t|
      t.string :agent_name
      t.integer :tokens_used
      t.decimal :cost
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
