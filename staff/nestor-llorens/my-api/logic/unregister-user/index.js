const validate = require('../../utils/validate')

const { ObjectId } = require('mongodb')

function unregisterUser (id, password) {
    
    validate.string(id, 'id')
    validate.string(password, 'password')

    return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
    .then(user => {
        if (!user) throw new Error(`user with id ${id} not found`)
    })
    .then(() => this.__users__.deleteOne({ _id: ObjectId(id), password }))
    .then(result => {
        if (!result.deletedCount) throw new Error(`wrong credentials`)
    })
}

module.exports = unregisterUser