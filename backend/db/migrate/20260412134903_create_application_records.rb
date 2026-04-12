class CreateApplicationRecords < ActiveRecord::Migration[8.1]
  def change
    create_table :application_records do |t|
      t.timestamps
    end
  end
end
