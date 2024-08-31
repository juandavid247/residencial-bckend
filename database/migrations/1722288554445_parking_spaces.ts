// database/migrations/[timestamp]_create_parking_spaces.ts

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'parking_spaces'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('parking_space_id')
      table.string('number').notNullable()
      table.integer('resident_id').unsigned().references('id').inTable('residents').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
