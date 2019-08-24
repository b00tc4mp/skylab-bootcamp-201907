const validate = require('../../utils/validate')

const { ObjectId } = require('mongodb')

function unregisterUser (id, password) {
    
    validate.string(id, 'id')
    validate.string(password, 'password')

    return this.__users__.deleteOne({ _id: ObjectId(id), password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}

module.exports = unregisterUser