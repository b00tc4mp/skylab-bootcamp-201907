/**
 * Retrieves an user by id
 * 
 * @param {string} id
 * 
 * @return {Promise}
 */
const { ObjectId } = require ('mongodb')
const validate = require ('../../utils/validate')

 module.exports = function (id) {
     validate.string(id, 'id') 

     return this.__users__.findOne ({ _id: ObjectId(id) }, {projection: { _id: 0, password: 0}})
        .then (user => {
            if (!user) throw Error (`user with id ${id} not found`) 

            user.id = id

            return user
        })
 }