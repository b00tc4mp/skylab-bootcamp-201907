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

    return Property.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()
        .then(property => {
            if (!property) throw Error(`Card width id ${id} does not exist`)
            property.id = id
            return property
        })
}