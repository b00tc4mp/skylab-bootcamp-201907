const validate = require('../../../utils/validate')
 const { Instrument } = require('../../../data')

/**
 * Unregisters an existent user account.
 * 
 * @param {string} id
 * @returns {Promise}
 */

module.exports = function (id ) {
    validate.string(id, 'id')
   

    return Instrument.deleteOne({ _id: id })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}