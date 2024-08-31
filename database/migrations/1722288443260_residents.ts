// database/migrations/[timestamp]_create_residents.ts

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'residents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('resident_id')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('phone').notNullable()
      table.string('email').notNullable().unique()
      table.integer('apartment_id').unsigned().references('id').inTable('apartments').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('estado').notNullable().unique()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
