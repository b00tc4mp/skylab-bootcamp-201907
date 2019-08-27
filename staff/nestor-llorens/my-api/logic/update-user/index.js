const validate = require('../../utils/validate')

const { ObjectId } = require('mongodb')

function updateUser (id, data) {

    validate.string(id, 'id')

    return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
    .then(user => {if (!user) throw new Error(`user with id ${id} not found`)})
    .then(() => this.__users__.updateOne({ _id: ObjectId(id) }, { $set: data }))
    .then(() => {})
}

module.exports = updateUser