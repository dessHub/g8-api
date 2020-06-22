'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('phone', 60).notNullable().unique()
      table.string('gender', 60).nullable()
      table.string('id_no', 60).nullable().unique()
      table.integer('user_id', 60).notNullable()
      table.string('profile_pic', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
