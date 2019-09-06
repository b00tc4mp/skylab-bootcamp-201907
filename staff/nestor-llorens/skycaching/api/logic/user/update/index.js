const validate = require('utils/validate')
const { models: { User } } = require('data')


function updateUser (id, data) {

    validate.string(id, 'id')

    return (async () => {

    const user = await User.findByIdAndUpdate(id, { $set: data })
    if (!user) throw new Error(`user with id ${id} not found`)
    })()
}

module.exports = updateUser