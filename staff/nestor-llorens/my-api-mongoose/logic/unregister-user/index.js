const validate = require('../../utils/validate')
const { User } = require('../../data')


function unregisterUser (id, password) {
    
    validate.string(id, 'id')
    validate.string(password, 'password')

    return User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
    .then(user => {
        if (!user) throw new Error(`user with id ${id} not found`)
    })
    .then(() => User.deleteOne({ _id: id, password }))
    .then(result => {
        if (!result.deletedCount) throw new Error(`wrong credentials`)
    })
}

module.exports = unregisterUser