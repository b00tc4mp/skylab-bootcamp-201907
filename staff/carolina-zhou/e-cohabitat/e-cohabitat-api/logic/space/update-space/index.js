const validate = require('../../../utils/validate')
const { Space } = require('../../../data')

/**
 * Updates a space
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'space id')
    validate.object(fieldsToUpdate, 'body')

    return (async() => {
        const space = await Space.findByIdAndUpdate(id, { $set: fieldsToUpdate })
            
        if (!space) throw new Error(`space with id ${id} does not exist`)
    })()
}