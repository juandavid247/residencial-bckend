// app/Models/Visitor.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Resident from './Resident'

export default class Visitor extends BaseModel {
  @column({ isPrimary: true })
  public visitor_id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public resident_id: number

  @column()
  public photo: Buffer

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Resident)
  public resident: BelongsTo<typeof Resident>
}
