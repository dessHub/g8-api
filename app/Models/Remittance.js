'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Remittance extends Model {

  /**
   *
   * @method saving 
   *
   * @return {Object}
   */
  saving () {
    return this.hasOne('App/Models/Saving')
  }

  /**
   *
   * @method user
   *
   * @return {Object}
   */
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Remittance
