class AddTechnicalDetailsToTasks < ActiveRecord::Migration[8.1]
  def change
    add_column :tasks, :technical_details, :jsonb
  end
end
