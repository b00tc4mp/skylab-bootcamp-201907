const validate = require('../../utils/validate')

const { ObjectId } = require('mongodb')

function updateUser (id, data) {

    validate.string(id, 'id')

    return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: data })
        .then(result => {
            if (!result.result.nModified) throw new Error(`user with id ${id} does not exist`)
        })
}

module.exports = updateUser