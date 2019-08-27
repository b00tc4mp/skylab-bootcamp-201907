const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Add  a property.
 * 
 * @param {string} userId 
 * @param {string} address 
 * @param {Number} sqm 
 * @param {Number} year
 * @param {String} cadastre
 * @param {Boolean} mortgage
 * 
 * @returns {Promise}
 */

module.exports = function (id, address, sqm, yearOfConstruction, cadastre, mortgage) {

    string.validate(address, 'address')
    string.validate(sqm, 'sqm')
    string.validate(yearOfConstruction, 'yearOfConstruction')
    string.validate(cadastre, 'cadastre')
    string.validate(mortgage, 'mortgage')

    return Promise.all([User.findById(id), Property.findOne({ cadastre })])
        .then(([user, property]) => {
            if (!user) throw new Error(`user ${id} does not exist`)

            if (property) throw new Error(`property with cadastre ${cadastre} already exists`)

            const newProperty = new Property({ address, sqm, yearOfConstruction, cadastre, mortgage })

            newProperty.owners.push(user.id)

            return newProperty.save()
        })
        .then(({ id }) => id)
}