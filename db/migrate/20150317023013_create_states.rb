class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :status

      t.timestamps null: false
    end
  end
end
