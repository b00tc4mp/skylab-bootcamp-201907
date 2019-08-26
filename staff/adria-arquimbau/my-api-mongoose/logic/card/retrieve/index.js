const { ObjectId } = require('mongodb')
const validate = require('../../../utils/validate')
const { Card } = require('../../../models')

/**
 * 
 * @param {*} id 
 * @returns {Promise}
 * 
*/

module.exports = function(id) {
    
    validate.string(id, 'id')

    return Card.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()
        .then(card => {
            if (!card) throw Error(`Card with id ${id} does not exist.`)
            card.id = id
            return card
        })
}