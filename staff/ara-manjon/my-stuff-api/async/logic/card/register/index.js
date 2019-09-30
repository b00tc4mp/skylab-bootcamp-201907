const validate = require('../../../utils/validate')
const { User, Card } = require('../../../data')
const convertDate = require('../../../utils/convert-date')

/**
 * Register card associated to a user by id.
 * @param {string} id Id of user
 * @param {number} number Number card
 * @param {Date} expiry Date of expiry card
 * 
 * @returns {Promise}
 */

module.exports = function(id, number, expiry) {
    validate.string(id, 'id')
    validate.number(number, 'card number')
    validate.date(expiry, 'expiry date')
    
    return (async ()=>{
        
        const user = await User.findById(id)
        
        if (!user) throw Error('User does not exists.')
            
        const existing = user.cards.some(({ number: _number }) => _number === number)
        
        if (existing) throw Error('Card already exists')
            
        user.cards.push(new Card({ number, expiry }))
            
        await user.save()
        return user.id

    })()

 }


