'use strict'

const User = use('App/Models/User')

class MemberController {
 

    async index ({response}) {
        try {
          let members = await User.query()
                          .with('profile')
                          .fetch()
      
          return response.status(200).json(members)
        } catch (e) {
          return response.status(405).json({message: e})
        }
    }
}

module.exports = MemberController
