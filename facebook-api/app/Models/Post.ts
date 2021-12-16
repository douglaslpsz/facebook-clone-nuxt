import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import { File, User, Comment, Reaction } from 'App/Models'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public description: string

  @column({ serializeAs: null })
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where('fileCategory', 'post'),
  })
  public media: HasOne<typeof File>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @computed()
  public get commentsCount() {
    return this.$extras.comments_count
  }

  @hasMany(() => Reaction, {serializeAs: null})
  public reactions: HasMany<typeof Reaction>
}
