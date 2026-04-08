# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_04_08_181218) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "agent_logs", force: :cascade do |t|
    t.string "action"
    t.string "agent_name"
    t.decimal "cost"
    t.datetime "created_at", null: false
    t.jsonb "metadata"
    t.bigint "project_id", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_agent_logs_on_project_id"
  end

  create_table "cost_records", force: :cascade do |t|
    t.string "agent_name"
    t.decimal "cost"
    t.datetime "created_at", null: false
    t.bigint "project_id", null: false
    t.integer "tokens_used"
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_cost_records_on_project_id"
  end

  create_table "project_versions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "project_id", null: false
    t.jsonb "snapshot"
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_versions_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.string "status"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.decimal "cost_estimate"
    t.datetime "created_at", null: false
    t.string "created_by_agent"
    t.string "description"
    t.bigint "project_id", null: false
    t.string "status"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_tasks_on_project_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "agent_logs", "projects"
  add_foreign_key "cost_records", "projects"
  add_foreign_key "project_versions", "projects"
  add_foreign_key "projects", "users"
  add_foreign_key "tasks", "projects"
end
