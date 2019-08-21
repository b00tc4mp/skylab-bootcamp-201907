const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = {  retrieveUser(id) {
    validate.string(id, 'id')

    return this.__users__.findOne({ _id: ObjectId(id) })
        .then(() => { users.delete({ _id: ObjectId(id) })
            
        })
}
}