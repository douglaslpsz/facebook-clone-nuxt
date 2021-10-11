import Route from '@ioc:Adonis/Core/Route'

//Route.post('/auth', 'Auth/Main.store')
//Route.delete('/auth', 'Auth/Main.destroy').middleware

Route.resource('/auth', 'Auth/Main')
.only(['store', 'destroy'])
.middleware({ 
  destroy: ['auth']
})

Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')

/*Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})*/