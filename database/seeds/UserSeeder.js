'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run() {
    const users = await User.all();
    for (const user of users.rows) {
      await Token.query()
        .where('user_id', user.id)
        .delete();
      await user.delete();
    }

    const user = new User();
    user.email = 'admin@mail.com';
    user.role = 'admin';
    user.password = 'admin';
    await user.save();

    await user
    .profile()
    .create({
       name: 'Admin Admin',
       phone: '0700000000',
       gender: 'Male',
       id_no: '2222222222',
       user_id: user.id
    })
  }
}

module.exports = UserSeeder
