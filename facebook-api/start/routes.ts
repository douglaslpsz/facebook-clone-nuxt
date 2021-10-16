import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth', 'Auth/Main.store')
Route.delete('/auth', 'Auth/Main.destroy').middleware('auth')

Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')
Route.put('/users/register', 'Users/Register.update')

Route.get('/users', 'Users/Main.show').middleware('auth')
Route.put('/users', 'Users/Main.update').middleware('auth')

Route.put('/users/avatar', 'Users/Avatar.update').middleware('auth')
Route.delete('/users/avatar', 'Users/Avatar.destroy').middleware('auth')

Route.get('/upload/:file', 'Uploads/Main.show')

Route.get('/users/search', 'Users/Search.index')//.middleware('auth')

Route.resource('/posts', 'Posts/Main')
  .apiOnly()
  .except(['show'])
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })