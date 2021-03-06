'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthVerif {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    // call next to advance the request
    try {
      await auth.check();
    } catch (error) {
      return response.status(401).send({ message: "Invalid token. Kindly login" });
    }

    await next()
  }
}

module.exports = AuthVerif
