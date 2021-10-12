import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileCategory: 'Avatar' | 'Post'

  @column()
  public fileName: string
  
  @column()
  public ownerId: number

}
