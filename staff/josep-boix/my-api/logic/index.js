const {ObjectId} = require ('mongodb')
const validate = require ('../utils/validate')

module.exports = {
    
    registerUser: require ('./register-user')
            

    },

    /**
     * Retrieve an user authenticate by credentials
     * 
     * @param {string} id
     * @param {string} token
     * 
     * @returns {Promise}
     */
    retrieveUser (id, token) {
        return this.__users__.findOne ({_id: ObjectId(id)}, 
            {projection: {id: 0, password: 0}}) //projection: avoid to send this fields as visible information
            .then (user => {
                if (!user) throw Error (`user with id ${id} not found`)

                user.id = id

                return user
            })
    }
}
