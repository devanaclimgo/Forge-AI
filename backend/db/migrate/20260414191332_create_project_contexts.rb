class CreateProjectContexts < ActiveRecord::Migration[8.1]
  def change
    create_table :project_contexts do |t|
      t.references :project, null: false, foreign_key: true
      t.jsonb :data

      t.timestamps
    end
  end
end
