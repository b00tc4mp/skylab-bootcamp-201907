const validate = require('../../utils/validate')
const { User } = require('../../data')

module.exports =
    /**
     * Retrieve user
     * 
     * @param {string} id 
     */
    function (id) {
        debugger
        validate.string(id, 'id user')
        return User.findOne({_id: id}, { _id: 0, password: 0, __v: 0 }).lean()
            .then(user => {
                if (!user) throw Error('Wrong credentials')

                user.id = id
                return user
            })
    }