// app/Models/ParkingSpace.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Apartment from './Apartment'

export default class ParkingSpace extends BaseModel {
  @column({ isPrimary: true })
  public parking_space_id: number

  @column()
  public space_number: string

  @column()
  public apartment_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Apartment)
  public apartment: BelongsTo<typeof Apartment>
}
