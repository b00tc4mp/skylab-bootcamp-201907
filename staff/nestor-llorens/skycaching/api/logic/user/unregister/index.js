const validate = require('../../../../utils/validate')
const { User } = require('../../../../data')


function unregisterUser (id, password) {
    
    validate.string(id, 'id')
    validate.string(password, 'password')

    return (async () => {

    const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
    if (!user) throw new Error(`user with id ${id} not found`)
    const result = await User.deleteOne({ _id: id, password })

    if (!result.deletedCount) throw new Error(`wrong credentials`)
    })()
    
}

module.exports = unregisterUser