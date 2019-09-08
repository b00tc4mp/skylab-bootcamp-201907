const { validate } = require('../../../../e-cohabitat-utils')
const { models: { Comment } } = require('../../../../e-cohabitat-data')

/**
 * Edits a comment
 * 
 * @param {*} id
 * @param {*} text 
 * 
* @returns {Promise}
*/

module.exports = function(id, text) {
    
    validate.string(id, 'comment id')
    validate.object(text, 'body')

    return (async() => {
        const comment = await Comment.findByIdAndUpdate(id, { $set: text })
            
        if (!comment) throw new Error(`comment with id ${id} does not exist`)
    })()
}