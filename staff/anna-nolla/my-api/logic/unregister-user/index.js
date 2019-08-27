const { ObjectId } = require('mongodb')


module.exports = {
    /**
     * errases a user using his e-mail as anchore.
     * 
     * @param {string} id
     * 
     * @returns {Promise}
    */
    unregister(userId, password){
        return this.__users__.findOne({ _id: ObjectId(userId) })
        .then((user) => {
            if(password !== user.password) throw Error(` The credentials do not correspond`) 
            return this.__users__.deleteOne({ _id: ObjectId(userId) })
             
        })
    }
}