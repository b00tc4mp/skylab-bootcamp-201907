const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = {  retrieveUser(id) {
    validate.string(id, 'id')

    return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: false, password: false } })
        .then(user => {
            user.id = id

            return user
        })
}
}