const { Vehicle } = require('../../../data')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, owner) {
    // TODO validate fields

    return Vehicle.deleteOne({ _id: id, owner })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })

}