const validate = require('../../../utils/validate')
const { Card } = require('../../../data')

/**
 * Unregister  card
 * 
 * @param {id} id
 * 
 * @return {Promise}
 *  
 */

module.exports = function (id) {

    validate.string(id, 'id')

    return (async () => {
        const result = await Card.deleteOne({ _id: id })
        if (!result.deletedCount) throw new Error(`wrong credentials`)
    })()
}