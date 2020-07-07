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
  Route.get('/users', 'MemberController.index').middleware('authVerif')

  Route.get('/remittances', 'RemittanceController.index').middleware('authVerif')
  Route.get('/remittances/:id', 'RemittanceController.show').middleware('authVerif')
  Route.get('/myremittances', 'RemittanceController.myRemittances').middleware('authVerif')

  Route.put('/admin/profile', 'ProfileController.updateRole').middleware('authAdmin')
  Route.post('/admin/remit', 'RemittanceController.store').middleware('authAdmin')
}).prefix('api/v1')
