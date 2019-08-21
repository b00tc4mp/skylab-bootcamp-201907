const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = {
    removeUser(id){
        validate.str(id , 'id')
        
        return this.__users__.deleteOne({_id: ObjectId(id) })
    }
}