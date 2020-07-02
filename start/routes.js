'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')

  Route.get('/profile', 'ProfileController.show').middleware('authVerif')
  Route.put('/profile', 'ProfileController.update').middleware('authVerif')

  Route.put('/admin/profile', 'ProfileController.updateRole').middleware('isAdmin')
}).prefix('api/v1')
