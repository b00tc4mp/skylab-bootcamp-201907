

const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../../logic')
const { User, Card } = require('../../../models')

describe('logic', () => {

    before(() => {
        mongoose.connect('mongodb://localhost/my-api-test', {

            useNewUrlParser: true,
            useUnifiedTopology: true

        })
    })

    beforeEach(async() => {

        await User.deleteMany()
        })

    let userId, cardId

    describe.only('unregister', () => {
        let name, surname, email, password 

        beforeEach(async() => {
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
            await newUser.save()
        })

        it('should remove card on correct data', async() => {
            const user = await logic.card.unregisterCard(userId, cardId)
                expect(user).not.to.exist
                const userFind = await User.findById(userId)
                const cardFound = userFind.cards.find(card => card.id === cardId)
                expect(cardFound).to.be.undefined
               
        })



        it('should fail on incorrect user', async () => {
            userId = 'manolete'
            try {
                await logic.card.unregisterCard(userId, cardId)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.exist
            }
            
        })

        it('should fail on incorrect card id', async () => {
            cardId = '12345'
            try {
                await logic.card.unregisterCard(userId, cardId)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.exist
            }
            
        })
        
        
    })
    after(() => mongoose.disconnect())
})