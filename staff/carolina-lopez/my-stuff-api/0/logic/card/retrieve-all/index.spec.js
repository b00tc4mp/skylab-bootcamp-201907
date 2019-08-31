const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')
 
 describe('logic - retrieve all cards', () => {
    
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let number, expiry, userId, cardId =[]
    
    beforeEach(() => {
        number = Math.random()
        expiry = new Date()
        return User.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`
                return User.create({ name, surname, email, password })
                .then(user => {
                    const newCard = new Card({ number, expiry })
                    const newCard2 = new Card({ number, expiry })
                    const newCard3 = new Card({ number, expiry })
                    userId = user.id
                    cardId.push(newCard.id,newCard2.id, newCard3.id)
                    
                    user.cards.push(newCard, newCard2, newCard3)
                    return user.save()
                })
            })
    })
    it('should succeed on correct data', () =>
        logic.card.retriveAll(userId)
            .then(cards => {
                expect(cards).to.exist
                expect(cards.length).to.equal(3)                
                cards.forEach((card, index)=>{
                    expect(card).to.exist
                    expect(card._id.toString()).to.equal(cardId[index])
                    expect(card.number).to.equal(number)
                    expect(card.expiry).to.deep.equal(expiry)
                })
            })
    )
    after(() => mongoose.disconnect())
})  