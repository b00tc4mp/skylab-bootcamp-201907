const { Property } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (owner, id, cadastre) {

    return (async() => {
        const prop = await Property.findOne({ owners: owner }).lean()
    
        if (!prop) throw new Error(`User with id ${owner} not found`)
        prop.owners.push(id)
    
        const _cadastre = await Property.findOneAndUpdate({ cadastre }, { $set: { owners: prop.owners } })
    
        if (!_cadastre) throw new Error(`property with cadastre ${cadastre.cadastre} does not exist`)
    })()
}