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

    return(async ()=>{
        let user=await User.findById(id)
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

            
    })()
    
}



/* module.exports = function(id, number, expiry) {
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
            
            const expiryDate = convertDate(expiry)
            const newCard = new Card({ number, expiry: expiryDate })
            cardId = newCard.id
            _user.cards.push(newCard)
            return _user.save()
        })
        .then(() => cardId)
} */




















/* module.exports = function(id, number, expiry) {
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
             Call to convertDate (in utils) to format string to date
            const expiryDate = convertDate(expiry)  03/19
            return Card.create({ number, expiry: expiryDate})
        })
        .then(newCard => {
            cardId = newCard._id
            _user.cards.push(newCard)
            return _user.save()
        })
        .then(() => cardId.toString())
} */