const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * 
 * @param {*} id 
 * @returns {Promise}
 * 
*/

module.exports = function(id, owner) {
    validate.string(id, 'id')
    validate.string(owner, 'owner')

    return (async () => {

        const user = await User.findOne({ _id : owner }, { _id: 0, __v: 0 }).lean()
        const { cards } = user
        const card = cards.find(card => {
        if(card._id.toString() === id) 
        return card })
        if (!card) throw new Error(`card with id ${id} does not exist`)
        return card

    })()
}



