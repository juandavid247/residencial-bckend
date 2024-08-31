// app/Models/Correspondence.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Resident from './Resident'
import DeliveryPerson from './DeliveryPerson'

export default class Correspondence extends BaseModel {
  public static table = 'correspondence'

  @column({ isPrimary: true })
  public correspondence_id: number

  @column()
  public resident_id: number

  @column()
  public delivery_person_id: number

  @column()
  public package_description: string

  @column.dateTime()
  public received_at: DateTime

  @column.dateTime()
  public delivered_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Resident)
  public resident: BelongsTo<typeof Resident>

  @belongsTo(() => DeliveryPerson)
  public deliveryPerson: BelongsTo<typeof DeliveryPerson>
}
