// app/Models/Movement.ts

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Movement extends BaseModel {
  @column({ isPrimary: true })
  public movement_id: number

  @column()
  public entity_type: string

  @column()
  public entity_id: number

  @column()
  public movement_type: string

  @column()
  public visitor_id: string

  @column()
  public employee_id: string

  @column.dateTime({ autoCreate: true })
  public timestamp: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
