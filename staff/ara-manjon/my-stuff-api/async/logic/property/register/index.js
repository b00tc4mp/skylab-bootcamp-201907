const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * 
 * @param {*} address 
 * @param {*} m2 
 * @param {*} year 
 * @param {*} cadastre 
 * @param {*} id 
 * 
 * @returns {Promise}
 */

module.exports = async function (id, address, m2, year, cadastre) {
    validate.string(address, 'address')
    validate.number(m2, 'm2')
    validate.number(year, 'year')
    validate.string(cadastre, 'cadastre')

    return (async ()=>{
        
        const properties = await Property.findOne({ cadastre })
        
        if (properties) throw new Error('Property already exists.')

        const property = new Property({ address,m2, year, cadastre })
        
        property.owners.push(id)
        
        await property.save()

        return property.id

        
        })()
        
}    
