const validate = require('../../../utils/validate')
const { User } = require('../../../data')
      /**
       * Retrieves a user by its id.
       * 
       * @param {string} id The id its given by authenticateUser
       * 
       * @returns {Promise}
       * 
       * Returns a user
       */
module.exports = function (id){
    validate.string(id)
    
        return (async () => {            
            const user= await User.findOne({ _id: id}, { _id: 0, password: 0 } ).lean()
            
            if (!user) throw new Error(`user with id ${id} not found`)

            user.id = id

            return user
            })()    
}

   