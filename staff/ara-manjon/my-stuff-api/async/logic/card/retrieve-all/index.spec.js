const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../data')
 
describe('logic - retrieve all cards', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let userId, number, expiry, cardId=[]

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        
        number = Math.random()
        expiry = new Date()
        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        const newCard = new Card({ number, expiry })
        const newCard2 = new Card({ number, expiry })
        const newCard3 = new Card({ number, expiry })
        userId = user.id
        cardId.push(newCard.id,newCard2.id, newCard3.id)
        user.cards.push(newCard, newCard2, newCard3)
        await user.save()
    })
    it('should succeed on correct data', async () => {
        const cards = await logic.card.retrieveAll(userId)
        expect(cards).to.exist
        expect(cards.length).to.equal(3)
        cards.forEach((card, index)=>{
            expect(card).to.exist
            expect(card._id.toString()).to.equal(cardId[index])
            expect(card.number).to.equal(number)
            expect(card.expiry).to.deep.equal(expiry)

        })
    })
    it('should fail on empty owner', async () => {
        userId = ''
        try {
            await logic.card.retrieveAll(userId)
        } catch({message}) {
            expect(message).to.equal('owner is empty or blank')
        }
    })
    it('should fail on undefined owner', async () => {
        userId = undefined
        try {
            await logic.card.retrieveAll(userId)
        } catch({message}) {
            expect(message).to.equal('owner with value undefined is not a string')
        }
    })
    it('should fail on wrong owner data type', async () => {
        userId = 123
        try {
            await logic.card.retrieveAll(userId)
        } catch({message}) {
            expect(message).to.equal('owner with value 123 is not a string')
        }
    })
    after(() => mongoose.disconnect())
})