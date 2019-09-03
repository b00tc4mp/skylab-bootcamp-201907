const validate = require('../../../utils/validate')
const { Space } = require('../../../data')

/**
 * Registers a space
 * 
 * @param {*} name 
 * @param {*} type 
 * @param {*} address 
 * @param {*} passcode 
 * @param {*} id 
 * 
 * @returns {Promise}
 */

module.exports = function(name, type, address, passcode, id) {

    validate.string(name, 'space name')
    validate.string(type, 'space type')
    validate.string(address, 'space address')
    validate.string(passcode, 'space passcode')
    validate.string(id, 'creator-user id')

    return (async () => {
        const result = await Space.findOne({ passcode })

        if (result) throw Error('space already exists')

        const space = new Space({ name, type, address, passcode })
        space.users.push(id)

        await space.save()

        return space._id.toString()
    })()
}    
