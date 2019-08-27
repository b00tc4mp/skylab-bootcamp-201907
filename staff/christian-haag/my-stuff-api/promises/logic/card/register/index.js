const mongoose = require('mongoose')
const { User, Card } = require('../../../data')

/**
 * Checks if user exist and add card . 
 * *If user _id match, new card is added
 * *if user _id don't match, error is thrown. Same for cards.
 * 
 * @param {string} cardBrand
 * @param {string} cardType
 * @param {number} number
 * @param {dat} expiry
 * 
 * @returns {Promise}
 */
module.exports = function (id, cardBrand, cardType, cardNumber, expiry) {

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new Error(`user width ${id} does not exist`)
            const newCard = new Card({ cardBrand: cardBrand, cardType: cardType, number: cardNumber, expiry: expiry })

            return User.updateOne({ _id: id }, { $push: { "cards": [newCard] } })
                .then(user => {
                    return user
                })
        })
        .catch(({ error }) => { return error })

}
