const { User, Property } = require('../../data/models')

/**
 * Registers a card associated to a user.
 * 
 * @param {string} id 
 * @param {string} address
 * @param {number} m2
 * @param {number} year
 * @param {string} cadastre
 * 
 * @returns {Promise}
 */
module.exports = function (id, address, m2, year, cadastre) {
    // TODO validate fields

    return Promise.all([User.findById(id), Property.findOne({ cadastre })])
        .then(([user, property]) => {
            if (!user) throw new Error(`user with id ${id} does not exists`)

            if (property) throw new Error(`property with cadastre ${cadastre} already exists`)

            property = new Property({ address, m2, year, cadastre })

            property.owners.push(id)

            return property.save()
        })
        .then(({ id }) => id)
}