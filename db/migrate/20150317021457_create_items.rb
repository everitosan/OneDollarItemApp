class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.references :user, index: true
      t.string :name
      t.string :description
      t.references :condition, index: true
      t.string :img
      t.float :amount

      t.timestamps null: false
    end
  end
end
