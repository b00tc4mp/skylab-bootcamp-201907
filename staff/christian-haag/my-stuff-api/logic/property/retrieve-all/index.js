const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function (id) {

    validate.string(id, 'id')

    return Property.find({ owner: id }, { __v: 0 }).lean()
        .then(properties => {
            if (!properties) throw new Error('no properties found for this user id')
            properties.forEach(property => {
                property.id = property._id
                //WTF, why delete?
                delete property._id
            })
        })
}
