// database/migrations/[timestamp]_create_movements.ts

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('movement_id')
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').onDelete('CASCADE')
      table.timestamp('entry_time', { useTz: true }).notNullable()
      table.timestamp('exit_time', { useTz: true }).nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
