import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Files extends BaseSchema {
  protected tableName = 'files'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('owner_id').notNullable() //Id do proprietário da imagem (pode ser o id do usuário, id da postagem, etc)
      table.enu('file_category', ['avatar', 'post']).notNullable()     
      table.string('file_name').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
