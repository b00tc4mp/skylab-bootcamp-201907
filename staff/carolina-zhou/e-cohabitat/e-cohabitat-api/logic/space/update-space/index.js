const { validate } = require('../../../../e-cohabitat-utils')
const { models: { Space } } = require('../../../../e-cohabitat-data')

/**
 * Updates a space
 * 
 * @param {*} spaceId
 * @param {*} dataToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(spaceId, dataToUpdate) {
    
    validate.string(spaceId, 'space id')
    validate.object(dataToUpdate, 'body')

    return (async() => {
        const space = await Space.findByIdAndUpdate(spaceId, { $set: dataToUpdate })
            
        if (!space) throw new Error(`space with id ${spaceId} does not exist`)
    })()
}