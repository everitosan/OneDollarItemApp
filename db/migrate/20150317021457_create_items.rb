class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :user_id
      t.string :description
      t.integer :status
      t.string :img

      t.timestamps null: false
    end
  end
end
