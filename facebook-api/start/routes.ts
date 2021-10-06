import Route from '@ioc:Adonis/Core/Route'

//Route.post('/auth', 'Auth/Main.store')
//Route.delete('/auth', 'Auth/Main.destroy').middleware

Route.resource('/auth', 'Auth/Main')
  .only(['store', 'destroy'])
  .middleware({ 
    destroy: ['auth']
  })