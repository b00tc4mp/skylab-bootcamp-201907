const { User, Vehicle, Property } = require('../../../data')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    // TODO validate fields
    if(id.length == 0) throw Error('id is empty')
    return (async () => {

        const prop = await Property.findOne({owners: id})

        if (prop) {

            let arr = prop.owners.toString().split(',')
            
            if (arr.includes(id)) throw Error(`User with id: ${id}, has a property yet`)
            
        }
        const user = await Vehicle.findOne({ owner: id })

        if (user) throw Error(`User with id: ${id}, has a car yet.`)

        const result = await User.deleteOne({ _id: id, password })

        if (!result.deletedCount) throw Error(`wrong credentials`)

    })()
}