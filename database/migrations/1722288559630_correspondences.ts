import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'correspondence'  // Asegúrate de que el nombre de la tabla sea correcto

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('correspondence_id')
      table.integer('resident_id').unsigned().references('id').inTable('residents').onDelete('CASCADE')
      table.integer('delivery_person_id').unsigned().references('id').inTable('delivery_people').onDelete('CASCADE')
      table.string('package_description').notNullable()
      table.timestamp('received_at', { useTz: true }).nullable()
      table.timestamp('delivered_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
