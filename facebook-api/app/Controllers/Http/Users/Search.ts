import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { IndexValidator } from 'App/Validators/User/Search'

export default class UserSearchController {
  
  public async index ({ request }: HttpContextContract) {
    
    const { keyword } = await request.validate(IndexValidator)
    
    const data = await User.query()
    .where('name', 'like', `%${keyword}%`)
    .orWhere('username', 'like', `%${keyword}%`)
    .orWhere('email', 'like', `%${keyword}%`)
    .orderBy('name')

    return data

  }

}
