const validate = require('../../../utils/validate')
const convertDate = require('../../../utils/convert-date')
const { User, Card } = require('../../../models')

/**
 * 
 * @param {*} id 
 * @param {*} number 
 * @param {*} expiry 
 * 
 * @returns {Promise}
 */

module.exports = function(id, number, expiry) {
    let _user, cardId

    validate.string(id, 'id')
    validate.string(number, 'number')
    validate.date(expiry, 'expiry date')
    
    return User.findById(id)
        .then(user => {
            if (!user) throw Error('User does not exists.')
            const card = user.cards.find(card => card.number === number)
            if (card) throw Error('Card already exists')
            _user = user

            // date amb slash!!!!!

            const expiryDate = convertDate(expiry)
            const newCard = new Card({ number, expiry: expiryDate })
            cardId = newCard.id
            _user.cards.push(newCard)
            return _user.save()
        })
        .then(() => cardId)
}