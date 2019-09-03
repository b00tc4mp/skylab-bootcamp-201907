/**
 * Retrieves an user by id
 * 
 * @param {string} id
 * 
 * @return {Promise}
 */
const { User } = require ('../../data')
const { ObjectId } = require ('mongodb')
const validate = require ('../../utils/validate')

 module.exports = function (id) {
     validate.string(id, 'id') 

     return User.findOne ({ _id: ObjectId(id) }, { _id: 0, password: 0}).lean()
//lean () documents returned from queries with the lean option true are plain javascript objects, not Mongoose Documents.
        .then (user => {
            if (!user) throw Error (`user with id ${id} not found`) 

            user.id = id

            return user
        })
 }