import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DeliveryPerson extends BaseSchema {
  protected tableName = 'delivery_persons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('delivery_person_id') // Cambiado a delivery_person_id
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('phone').notNullable()
      table.string('company').notNullable()
      table.string('photo').nullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
