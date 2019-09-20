const { User, Property } = require('../../../data')

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
module.exports = function (address, m2, year, cadastre, owners) {
    // TODO validate fields
    return ( async()=>{
        const user = await User.findOne({ _id: owners[0] })
    
        if (!user) throw new Error(`User with ${id} does not exists`)
        const prop = await Property.findOne({ cadastre })
    
        if (prop) throw new Error(`Property already exist.`)
        const res = await Property.create({ address, m2, year, cadastre, owners })
        return res
    })()
}