// app/Models/Resident.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Apartment from './Apartment'
import Vehicle from './Vehicle'
import Correspondence from './Correspondence'

export default class Resident extends BaseModel {
  @column({ isPrimary: true })
  public resident_id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public apartment_id: number

  @column()
  public photo: Buffer

  @column()
  public estado: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Apartment)
  public apartment: BelongsTo<typeof Apartment>

  @hasMany(() => Vehicle)
  public vehicles: HasMany<typeof Vehicle>

  @hasMany(() => Correspondence)
  public correspondence: HasMany<typeof Correspondence>
}
