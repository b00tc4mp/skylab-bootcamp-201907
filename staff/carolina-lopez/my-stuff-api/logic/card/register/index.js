const validate = require('../../../utils/validate')
const convertDate = require('../../../utils/convert-date')
const { User, Card } = require('../../../models')
/**
*
@param {} id
@param {} number
@param {} expiry
*
* @returns {Promise}
*/
module.exports = function(id, number, expiry) {
   validate.string(id, 'id')
   validate.string(number, 'card number')
   validate.date(expiry, 'expiry date')
   
   return User.findById(id)
       .then(user => {
           if (!user) throw Error('User does not exists.')
           const card = user.cards.find(card => card.number === number)
           if (card) throw Error('Card already exists')
           // Call to convertDate (in utils) to format string to date
           const expiryDate = convertDate(expiry)
           const newCard = new Card({ number, expiry: expiryDate})
           user.cards.push(newCard)
           return user.save()
       })
       .then(user => user.cards[user.cards.length -1].id)
}