// app/Models/Vehicle.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Resident from './Resident'
import ParkingSpace from './ParkingSpace'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public vehicle_id: number

  @column()
  public license_plate: string

  @column()
  public model: string

  @column()
  public color: string

  @column()
  public resident_id: number

  @column()
  public parking_space_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public estado: boolean

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Resident)
  public resident: BelongsTo<typeof Resident>

  @belongsTo(() => ParkingSpace)
  public parkingSpace: BelongsTo<typeof ParkingSpace>
}
