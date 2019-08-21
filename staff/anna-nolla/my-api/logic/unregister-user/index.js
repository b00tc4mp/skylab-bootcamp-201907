const { ObjectId } = require('mongodb')


module.exports = {
    /**
     * errases a user using his e-mail as anchore.
     * 
     * @param {string} email 
     * 
     * @returns {Promise}
    */
    unregister(id){
        return this.__users__.deleteOne({ _id: ObjectId(id) })
    }
}