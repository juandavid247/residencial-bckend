// database/migrations/[timestamp]_create_apartments.ts

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'apartments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('apartment_id')
      table.string('number').notNullable()
      table.integer('floor').notNullable()
      table.string('building').notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
