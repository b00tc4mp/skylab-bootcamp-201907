const { ObjectId } = require('mongodb')

module.exports = {
    updateUser(id, update){
         debugger
        return this.__users__.findOneAndUpdateOne({_id: ObjectId(id)},{$set:update})
        .then((result) => { debugger
            if(result.value==null)
            throw Error('User not updated.')
            else
            return result
        })
    }
}