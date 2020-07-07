'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemittanceSchema extends Schema {
  up () {
    this.create('remittances', (table) => {
      table.increments()
      table.integer('amount', 60).notNullable()
      table.integer('user_id', 60).notNullable()
      table.integer('created_by', 60).notNullable()
      table.string('ref_id', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('remittances')
  }
}

module.exports = RemittanceSchema
