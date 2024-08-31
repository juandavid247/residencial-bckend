import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Apartments from './Apartment'
export default class DeliveryPerson extends BaseModel {
  public static table = 'delivery_persons'

  @column({ isPrimary: true })
  public delivery_person_id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public phone: string

  @column()
  public company: string

  @column()
  
  public photo: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Apartments)
  public apartaments: HasMany<typeof Apartments>
}
