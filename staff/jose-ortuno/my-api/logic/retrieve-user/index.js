const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = function (id) {
    validate.string(id, 'id user')

    return this.__users__.findOne({ _id: ObjectId(id) }, {
        projection: { _id: 0, password: 0 }
    }).then(user => {
        if (!user) throw Error('Wrong credentials')

        user.id = id
        return user
    })
}