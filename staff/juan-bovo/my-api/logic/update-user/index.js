const { ObjectId } = require('mongodb')

module.exports = {
    updateUser(id, update){

        return this.__users__.findOneAndUpdate({_id: ObjectId(id)},{$set:update})
    }
}