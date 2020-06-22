'use strict'

class ProfileController {

  async show ({auth, response}) {
    try {
      const user = await auth.getUser()

      const profile = await user
      .profile()
      .fetch()

      const res = {
        user,
        profile
      }

      return response.status(201).json(res)
    } catch (e) {
      return response.json({message: e})
    }
  }

  async update ({auth, request, response}) {
    try{

      const { name, phone, gender, id_no, profile_pic } = request.all()

      const user = await auth.getUser()
      let profile = await user
      .profile()
      .fetch()

      profile.name = name
      profile.phone = phone
      profile.gender = gender
      profile.id_no = id_no 
      profile.profile_pic = profile_pic

      await profile.save()

      return response.status(200).json(profile)
    } catch (e) {
      return response.json({message: e})
    }
  }

}

module.exports = ProfileController
