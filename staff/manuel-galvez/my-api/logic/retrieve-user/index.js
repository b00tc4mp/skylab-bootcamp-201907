const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')
module.exports = {
    /**
     * 
     * @param {*} name 
     * @param {*} surname 
     * @param {*} email 
     * @param {*} password 
     * @param {*} repassword 
     * 
     * @returns {Promise}
     */

    retrieveUser(id) {
        validate.string(id, 'id')

        return this.__users__.findOne({ _id: ObjectId(id) }, {projection: { _id: 0, password: 0 }})
            .then(user => {
                if (!user) throw Error('Wrong credentials.')
                user.id = id
                return user
            })
    }
}