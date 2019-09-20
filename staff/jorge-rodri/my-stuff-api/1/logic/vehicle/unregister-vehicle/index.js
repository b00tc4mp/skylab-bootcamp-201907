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
    return (async () => {
        
        const result = await Vehicle.deleteOne({ _id: id, owner })
        
        if (!result.deletedCount) throw new Error(`wrong credentials`)

    })()

}