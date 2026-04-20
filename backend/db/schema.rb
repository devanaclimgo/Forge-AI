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

ActiveRecord::Schema[8.1].define(version: 2026_04_20_212253) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "agent_logs", force: :cascade do |t|
    t.string "agent_name"
    t.datetime "created_at", null: false
    t.jsonb "input"
    t.jsonb "output"
    t.bigint "project_id", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_agent_logs_on_project_id"
  end

  create_table "project_contexts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.jsonb "data"
    t.bigint "project_id", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_contexts_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "description"
    t.string "name"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.string "visibility"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "sprints", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.date "end_date"
    t.string "name"
    t.bigint "project_id", null: false
    t.date "start_date"
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_sprints_on_project_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.string "description"
    t.string "priority"
    t.bigint "project_id", null: false
    t.bigint "sprint_id"
    t.string "status"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["sprint_id"], name: "index_tasks_on_sprint_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "agent_logs", "projects"
  add_foreign_key "project_contexts", "projects"
  add_foreign_key "projects", "users"
  add_foreign_key "sprints", "projects"
  add_foreign_key "tasks", "projects"
  add_foreign_key "tasks", "sprints"
end
