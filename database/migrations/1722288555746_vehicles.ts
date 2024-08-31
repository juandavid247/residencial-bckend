// database/migrations/[timestamp]_create_vehicles.ts

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('vehicle_id')
      table.string('plate_number').notNullable()
      table.string('model').notNullable()
      table.string('color').notNullable()
      table.integer('resident_id').unsigned().references('id').inTable('residents').onDelete('CASCADE')
      table.integer('parking_space_id').unsigned().references('id').inTable('parking_spaces').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
