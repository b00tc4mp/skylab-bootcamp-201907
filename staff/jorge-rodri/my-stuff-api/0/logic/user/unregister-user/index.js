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

    return Property.findOne({})
        .then(prop => {
            
            if (prop) {
                let arr = prop.owners.toString().split(',')
                
                if (arr.includes(id)) throw new Error(`User with id: ${id}, has a property yet.`)
            }
            return Vehicle.findOne({ owner: id })
                .then(user => {
                    
                    if (user) throw new Error(`User with id: ${id}, has a car yet.`)
                    return User.deleteOne({ _id: id, password })
                        .then(result => {
                            
                            if (!result.deletedCount) throw new Error(`wrong credentials`)
                        })
                })
        })
}