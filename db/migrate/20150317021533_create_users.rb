class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :fb_id
      t.string :name
      t.string :first_n
      t.string :last_n
      t.string :locate
      t.string :email

      t.timestamps null: false
    end
  end
end
