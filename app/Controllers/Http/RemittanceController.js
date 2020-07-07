'use strict'

const Remittance = use('App/Models/Remittance')
const Saving = use('App/Models/Saving')
class RemittanceController {

  async index ({response}) {
    try {
      let remittances = await Remittance.query()
                    .with('saving')
                    .with('user')
                    .fetch()
  
      return response.status(200).json(remittances)
    } catch (e) {
      return response.json({message: e})
    }
  }

  async show ({params, response}) {
    try {

      const remittance = await Remittance.find(params.id)
      const saving = await remittance
           .saving()
           .fetch()
      const user = await remittance
           .user()
           .fetch()

      Object.assign(remittance, {user}, saving)

      return response.status(200).json(remittance)
    } catch (e) {
      return response.status(405).json({message: e})
    }
  }

  async myRemittances ({params, response, auth}) {
    try {

      const authUser = await auth.getUser()
      let remittances = await Remittance
            .query()
            .with('saving')
            .fetch()
      let jsonRemittance = remittances.toJSON();

      remittances = jsonRemittance.filter(item => item.user_id === authUser.id)

      return response.json(remittances)
    } catch (e) {
      return response.json({message: e})
    }
  }

  // Get authenticated user's order
  // async retrieve ({params, auth, response}) {
  //   try {
  //     const authUser = await auth.getUser()
  //     const order = await Order.find(params.id)
  //     const user = await order
  //       .user()
  //       .fetch()

  //     if (user.id === authUser.id) {
  //       const histories = await order
  //            .histories()
  //            .fetch()

  //       Object.assign(order, {user}, histories)

  //       return response.json(order)
  //     } else {
  //       return response.json({message: 'Not authorized to view this order.'})
  //     }
  //   } catch (e) {
  //     return response.json({message: e})
  //   }
  // }

  async store ({request, response, auth}) {
    const { amount, savings, user_id, ref_id } = request.all()

    const authUser = await auth.getUser()

    let remittance = new Remittance()
    remittance.amount = amount
    remittance.ref_id = ref_id
    remittance.created_by = authUser.id
    remittance.user_id = user_id

    await remittance.save()

    const remittanceId = remittance.id

    await remittance.saving()
          .create({
            remittance_id: remittanceId,
            amount: savings,
            user_id
          })

    remittance = await Remittance.find(remittanceId)
    const saving = await remittance
         .saving()
         .fetch()
    const user = await remittance
         .user()
         .fetch()

    Object.assign(remittance, {user}, saving)
    return response.status(201).json(remittance)
  }
}

module.exports = RemittanceController
