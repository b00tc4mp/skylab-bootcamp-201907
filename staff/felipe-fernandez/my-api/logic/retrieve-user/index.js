const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')
 
 /**
     * 
     * @param {*} id 
     * @param {*} token 
     * 
     * @returns {Promise}
     */
    module.exports = function(id){
        validate.string(id, 'id')
       
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                if(!user) throw new Error(`user with id ${id} not found`)
                user.id = id

                return user
            }) 

    

}