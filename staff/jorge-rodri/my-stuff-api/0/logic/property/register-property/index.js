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
        return User.findOne({ _id: owners[0] })
            .then(user => {
                if (!user) throw new Error(`User with ${id} does not exists`)
                return Property.findOne({ cadastre })
                    .then(prop => {
                        if (prop) throw new Error(`Property already exist.`)
                        return Property.create({ address, m2, year, cadastre, owners })
                        .then( () => { })
                    })
            })
}