const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

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

    return Vehicle.deleteOne({ _id: id })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}