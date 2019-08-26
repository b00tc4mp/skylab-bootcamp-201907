const validate = require('../../../utils/validate')
const { Property } = require('../../../models')

/**
 * 
 * @param {*} id 
 * @param {*} body
 * 
 * @returns {Promise}
 */

module.exports = function(id, body) {



    /*validate.string(address, 'address')
    validate.number(m2, 'm2')
    validate.number(year, 'year')
    validate.string(cadastre, 'cadastre')

    return Property.findOne({ cadastre })
        .then(response => {
            if (response) throw new Error('Property already exists.')
            const property = new Property({ address,m2, year, cadastre })
            property.owners.push(id)
            return property.save()
        })
        .then(response => response._id.toString())*/
}    
