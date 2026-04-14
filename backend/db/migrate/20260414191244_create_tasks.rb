class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :description
      t.string :status
      t.string :priority
      t.references :project, null: false, foreign_key: true
      t.references :sprint, null: false, foreign_key: true
      t.string :category

      t.timestamps
    end
  end
end
