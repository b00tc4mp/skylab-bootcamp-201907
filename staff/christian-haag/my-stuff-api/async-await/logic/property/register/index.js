const validate = require('../../../utils/validate')
const { Property, User } = require('../../../data')

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
    validate.string(id, 'id')
    validate.string(address, 'address')
    validate.number(sqm, 'sqm')
    validate.number(yearOfConstruction, 'yearOfConstruction')
    validate.string(cadastre, 'cadastre')
    validate.boolean(mortgage, 'mortgage')

    return (async () => {

        const [user, property] = await Promise.all([User.findById(id), Property.findOne({ cadastre })])

        if (!user) throw new Error(`user ${id} does not exist`)

        if (property) throw new Error(`property with cadastre ${cadastre} already exists`)

        const _property = new Property({ address, sqm, yearOfConstruction, cadastre, mortgage })

        _property.owners.push(user.id)

        await _property.save()

        return _property.id

    })()
}