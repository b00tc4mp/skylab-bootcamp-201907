const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = function (id){
    /**
     * 
     * @param {*} id
     * @param {*} token
     * 
     * @returns {Promise}
     */
    
        // TODO validate fields

        // VIKING style
        // return this.__users__.findOne({ _id: ObjectId(id) })
        //     .then(user => {
        //         user.id = user._id.toString()
        //         delete user._id
        //         delete user.password

        //         return user
        //     })

        // TUNED style
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                if (!user) throw new Error(`user with id ${id} not found`)

                user.id = id

                return user
            })
    
}

   