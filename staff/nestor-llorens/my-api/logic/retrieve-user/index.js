const validate = require('../../utils/validate')

const { ObjectId } = require('mongodb')

function retrieveUser (id) {

    validate.string(id, 'id')

    return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
        .then(user => {
            if (!user) throw new Error(`user with id ${id} not found`)

            user.id = id

            return user
        })
}

module.exports = retrieveUser