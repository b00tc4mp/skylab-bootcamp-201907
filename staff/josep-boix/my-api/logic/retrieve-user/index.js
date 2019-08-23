const { ObjectId } = require ('mongodb')

/**
 * Retrieves an user by id
 * 
 * @param {string} id
 * 
 * @return {Promise}
 */

 module.exports = function (id) {
     return this.__users__.findOne ({ _id: ObjectId(id) }, {projection: { _id: 0, password: 0}})
        .then (user => {
            if (!user) throw Error (`user with id ${id} not found`) 

            user.id = id

            return user
        })
 }