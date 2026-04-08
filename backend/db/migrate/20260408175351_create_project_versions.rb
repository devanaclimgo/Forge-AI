class CreateProjectVersions < ActiveRecord::Migration[8.1]
  def change
    create_table :project_versions do |t|
      t.jsonb :snapshot
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
