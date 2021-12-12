import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Comment/Main'
import { Comment } from 'App/Models'

export default class CommentsController {
  public async index ({request}: HttpContextContract) {

    const { post_id } = request.qs()

    const comments = await Comment.query().where('post_id', post_id).orderBy('created_at')

    return comments

  }

  public async store ({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await auth.user!.related('comments').create(data)
    return post
  }

  //public async show ({}: HttpContextContract) {
  //}

  public async update ({request, response, params, auth}: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const comment = await Comment.findOrFail(params.id)

    if (auth.user!.id != comment.userId) {
      return response.unauthorized()
    } else {
      await comment.merge(data).save()

      return comment
    }

  }

  public async destroy ({response, params, auth}: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)

    if(auth.user!.id != comment.userId) {
      return response.unauthorized()
    } else {
      await comment.delete()
    }
  }
}
