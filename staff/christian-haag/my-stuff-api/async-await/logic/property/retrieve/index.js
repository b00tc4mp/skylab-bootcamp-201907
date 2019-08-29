const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * 
 * @param {*} id
 * @returns {Promise}
 * 
 */

module.exports = function (id) {
    validate.string(id, 'id')

    return (async () => {
        const property = await Property.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()

        if (!property) throw Error(`Property width given id does not exist`)
        property.id = id
        return property
    })()
}