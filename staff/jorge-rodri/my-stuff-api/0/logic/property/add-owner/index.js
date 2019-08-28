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
    return Property.findOne({owners:owner}).lean()
        .then(prop => {
            if (!prop) throw new Error(`User with id ${owner} not found`)
            prop.owners.push(id)
            
            return Property.findOneAndUpdate( {cadastre} , { $set: {owners: prop.owners}})
                .then(cadastre => {
                    if (!cadastre) throw new Error(`property with cadastre ${cadastre.cadastre} does not exist`)
                })
        })
}