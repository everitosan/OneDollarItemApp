class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.references :user, index: true
      t.string :description
      t.references :condition, index: true
      t.string :img

      t.timestamps null: false
    end
  end
end
