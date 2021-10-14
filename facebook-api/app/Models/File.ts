import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public fileCategory: 'Avatar' | 'Post'

  @column({ serializeAs: null })
  public fileName: string
  
  @column({ serializeAs: null })
  public ownerId: number

  @computed()
  public get url(): string {
    return `http://${Env.get('APP_URL')}/uploads/${this.fileName}`
  }

}
