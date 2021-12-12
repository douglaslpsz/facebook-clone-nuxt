import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
		content: schema.string.optional({ trim: true }),
  })

  public messages = {}
}
