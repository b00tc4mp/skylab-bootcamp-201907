const { User, Card } = require('../../../data')
const convertDate = require('../utils/convertDate')

module.exports = function (id, number, expiry) {
    // TODO validate fields
    
    return User.findOne({ _id: id })
        .then(user => {
            if (!user) throw new Error(`user with id ${id} not exists.`)
            
            let num =  user.card.find( card => card.number == number)

            if(num) throw new Error(`card with number ${number} not exist.`)
            
            const date = convertDate(expiry)

            const cards = new Card({ number, expiry:date })

            user.card.push(cards)

            return user.save()

        })
        .then(() => { })
}