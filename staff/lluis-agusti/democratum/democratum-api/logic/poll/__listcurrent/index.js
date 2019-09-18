const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { Citizen } = models

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */

module.exports = function (id, data) {
     validate.string(id, 'id')
    
    async () => {
        const citizen = await Citizen.findByIdAndUpdate(id, {$set:data})
        if (!citizen) throw new Error(`user with id ${id} does not exist`)
        }
}