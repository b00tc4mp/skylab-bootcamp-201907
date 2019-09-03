const validate = require('../../../utils/validate')
const { Space } = require('../../../data')

/**
 * Unregisters a property
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {

    validate.string(id, 'space id')

    return (async () => {
        const result = await Space.deleteOne({ _id: id })
        if (!result.deletedCount) throw Error('wrong data provided')
    })()
}