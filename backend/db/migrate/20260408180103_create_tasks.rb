class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :description
      t.string :status
      t.references :project, null: false, foreign_key: true
      t.string :created_by_agent
      t.decimal :cost_estimate

      t.timestamps
    end
  end
end
