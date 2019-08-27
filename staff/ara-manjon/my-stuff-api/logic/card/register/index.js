const validate = require('../../../utils/validate')
const convertDate = require('../../../utils/convert-date')
const { User, Card } = require('../../../data')

/**
 * 
 * @param {string} id 
 * @param {number} number 
 * @param {Date} expiry 
 * 
 * @returns {Promise}
 */

module.exports = function(id, number, expiry) {
    validate.string(id, 'id')
    validate.number(number, 'number')
    validate.date(expiry, 'expiry date')
    
    return User.findById(id)
        .then(user => {
            if (!user) throw Error('User does not exists.')
           
            const existing = user.cards.some(({ number: _number }) => _number === number)
            if (existing) throw Error('Card already exists')
            
            user.cards.push(new Card({ number, expiry }))
            
            return user.save()
        })
        .then(()=> {})
}
