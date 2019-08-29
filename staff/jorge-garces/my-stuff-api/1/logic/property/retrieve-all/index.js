const validate = require('../../../utils/validate')
const { Property } = require('../../../models')
/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/
module.exports = function (id) {

    validate.string(id, 'User id')

    return (async () => {
        debugger
        const properties = await Property.find({ owners: id }, { __v: 0 }).lean()
        if (!properties) throw Error(`User with id ${id} does not own any property.`)
        properties.forEach(property => {
            property.id = property._id
            delete property._id
        })
        return properties
    })()
}