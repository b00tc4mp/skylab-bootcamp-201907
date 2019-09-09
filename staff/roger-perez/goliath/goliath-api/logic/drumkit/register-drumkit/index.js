const validate = require('../../../utils/validate')
const { User, } = require('../../../data')

/**
 * Registers a drumkit associated to a user
 * 
 * @param {string} id 
 * @param {string} name 
 * @param {date} sequences 
 * 
 * @returns {Promise}
 */

module.exports = function(id, drumkitName, sequences) {
    validate.string(id, 'user id')
    validate.string(drumkitName, 'drumkit name')
    validate.date(sequences, 'sequences') 

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const existing = user.drumkits.some(({ name: _name }) => _name === name)

        if (existing) throw new Error(`user with id ${id} already has drumkit name ${name}`)

        const drumkit = new drumkit({ drumkitName, sequences,creator })

        drumkits.creator.push(user.id)

        await user.save()

        return drumkit.id
    })()

}