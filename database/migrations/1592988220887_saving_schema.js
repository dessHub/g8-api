'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SavingSchema extends Schema {
  up () {
    this.create('savings', (table) => {
      table.increments()
      table.integer('amount', 60).notNullable()
      table.integer('user_id', 60).notNullable()
      table.integer('remittance_id', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('savings')
  }
}

module.exports = SavingSchema
