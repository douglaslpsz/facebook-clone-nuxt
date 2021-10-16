import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
		keyword: schema.string({ trim: true,  })
  })

  public messages = {}
}
