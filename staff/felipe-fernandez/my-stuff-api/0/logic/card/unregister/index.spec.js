// const mongoose = require('mongoose')
// const { expect } = require('chai')
// const logic = require('../../../logic')
// const { User, Card } = require('../../../models')

// describe('logic-card', () => {
//     before(() => {
//         mongoose.connect('mongodb://172.17.0.2/my-api-test', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//     })
//     beforeEach(() => User.deleteMany())
//     let userId, cardId
//     describe('unregister', () => {
//         let name, surname, email, password, repassword
//         beforeEach(() => {
//             name = `name-${Math.random()}`
//             surname = `surname-${Math.random()}`
//             email = `email-${Math.random()}@domain.com`
//             password = `password-${Math.random()}`
//             cardNumber = `${Math.floor(Math.random())}`
//             cardExpiry = '09/19'
//             const newUser = new User({ name, surname, email, password })
//             userId = newUser.id
//             const newCard = new Card({ cardNumber, cardExpiry })
//             cardId = newCard.id
//             newUser.cards.push(newCard)
//             return newUser.save()
//         })
//         it('should remove card on correct data', () => {
//             return logic.card.unregister(userId, cardId)
//                 .then(response => {
//                     expect(response).not.to.exist
//                     return User.findById(userId)
//                 }).then(user => {
//                     debugger
//                     const cardFound = user.cards.find(card => card.id === cardId)
//                     expect(cardFound).to.be.undefined
//                 })
//         })
//         it('should fail on incorrect user', () => {
//             logic.card.unregister('manolete', cardId)
//                 .catch(error => {
//                     expect(error).to.exist
//                 })
//         })
//         it('should fail on incorrect card id', () => {
//             logic.card.unregister(userId, cardId)
//                 .catch(error => expect(error).to.exist)
//                 .then(response => expect(response).not.to.exist)
//         })
//     })
//     after(() => mongoose.disconnect())
// })


const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../../logic')
const { User, Card } = require('../../../models')

describe.only('logic', () => {
    before(() => {
        mongoose.connect('mongodb://localhost/my-api-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })
    beforeEach(() => User.deleteMany())
    let userId, cardId
    describe('unregister', () => {
        let name, surname, email, password, repassword
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            cardNumber = `${Math.floor(Math.random())}`
            cardExpiry = '09/19'
            const newUser = new User({ name, surname, email, password })
            userId = newUser.id
            const newCard = new Card({ cardNumber, cardExpiry })
            cardId = newCard.id
            newUser.cards.push(newCard)
            return newUser.save()
        })
        it('should remove card on correct data', () => {
            return logic.card.unregister(userId, cardId)
                .then(response => {
                    expect(response).not.to.exist
                    return User.findById(userId)
                }).then(user => {
                    debugger
                    const cardFound = user.cards.find(card => card.id === cardId)
                    expect(cardFound).to.be.undefined
                })
        })
        it('should fail on incorrect user', () => {
            return logic.card.unregister('manolete', cardId)
                .catch(error => {
                    expect(error).to.exist
                })
        })
        it('should fail on incorrect card id', () => {
            return logic.card.unregister(userId, cardId)
                .catch(error => expect(error).to.exist)
                .then(response => expect(response).not.to.exist)
        })
    })
    after(() => mongoose.disconnect())
})