// app/Models/Apartment.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Resident from './Resident'
import ParkingSpace from './ParkingSpace'

export default class Apartments extends BaseModel {
  @column({ isPrimary: true })
  public apartment_id: number

  @column()
  public apartment_number: string

  @column()
  public floor: number

  @column()
  public section: string

  @column()
  public resident_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Resident)
  public residents: HasMany<typeof Resident>

  @hasMany(() => ParkingSpace)
  public parkingSpaces: HasMany<typeof ParkingSpace>
}
