import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { File, User } from '.'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public description: string

  @column()
  public serId: string

  @belongsTo( () => User)
  public user: BelongsTo<typeof User>

  @hasOne( () => File, {
    foreignKey: 'awnerId',
    onQuery: (query) => query.where('fileCategory', 'post')
  })
  public media: HasOne<typeof File>
}
