const validate = require('../../../utils/validate')
const { User, Card } = require('../../../data')

/**
 * Register a card by user id, introduced a number card and date expiry.
 * 
 * @param {string} id 
 * @param {number} number 
 * @param {Date} expiry 
 * 
 * @returns {Promise}
 */

module.exports = function(id, number, expiry) {
    validate.string(id, 'id')
    validate.number(number, 'card number')
    validate.date(expiry, 'expiry date')
    
    return User.findById(id)
        .then(user => { 
            if (!user) throw Error('User does not exists.')
            
            const existing = user.cards.some(({ number: _number }) => _number === number)
            if (existing) throw Error('Card already exists')
            
            user.cards.push(new Card({ number, expiry }))
            
            return user.save()
        })
        .then(() => { })
 }
