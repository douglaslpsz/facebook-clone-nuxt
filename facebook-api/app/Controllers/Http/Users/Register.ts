import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/Register'
import { User, UserKey } from 'App/Models'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserRegistersController {
  
  public async store ({request}: HttpContextContract) {

    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator)
      const user = new User()

      user.useTransaction(trx)

      user.email = email

      await user.save()

      const key = faker.datatype.uuid() + user.id

      user.related('keys').create({ key })

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

      await Mail.send( (message) => {
        message.to(email)
        message.from('contato@facebook.com', 'Facebook Clone')
        message.subject('Criação de conta - Facebook Clone')
        message.htmlView('emails/verify-email', {link})
      })
      
    })

    

  }

  public async show ({ params }: HttpContextContract) {

    const userKey = await UserKey.findByOrFail('key', params.key)
    
    await userKey.load('user')

    return userKey.user

  }

  public async update ({ request, response }: HttpContextContract) {

    const { key, name, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    const user = await userKey.related('user').query().firstOrFail()

    const username = `${name.split(' ')[0].toLocaleLowerCase()}${new Date().getTime()}`

    user.merge({ name, password, username })

    await user.save()

    await userKey.delete()

    return response.ok({ message: 'Ok'})

  }
}
