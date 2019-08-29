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
    describe('unregister', () => {
        let name, surname, email, password 
        beforeEach(async() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            cardNumber = Number((Math.random() * 10000000000).toFixed())
            cardExpiry = '09/19'
            const newUser = new User({ name, surname, email, password })
            userId = newUser.id
            const newCard = new Card({ cardNumber, cardExpiry })
            cardId = newCard.id
            newUser.cards.push(newCard)
            await newUser.save()
        })
        it('should remove card on correct data', async() => {
                const user = await logic.card.unregister(userId, cardId)
                expect(user).not.to.exist
                const userFind = await User.findById(userId)
                const cardFound = userFind.cards.find(card => card.id === cardId)
                expect(cardFound).to.be.undefined
               
        })
        it('should fail on incorrect user', async () => {
            userId = 'manolete'
            try {
                await logic.card.unregister(userId, cardId)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.exist
            }
            
        })
        it('should fail on incorrect card id', async () => {
            cardId = '12345'
            try {
                await logic.card.unregister(userId, cardId)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.exist
            }
            
        })

    /* USER ID */
    it('should fail on empty User ID', () => 
        expect(() => 
               logic.card.unregister('', cardId)
    ).to.throw('User ID is empty or blank')
    )

     it('should fail on undefined User ID', () => 
        expect(() => 
               logic.card.unregister(undefined, cardId)
    ).to.throw(`User ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for id', () => 
        expect(() => 
               logic.card.unregister(123, cardId)
    ).to.throw(`User ID with value 123 is not a string`)
     )

        /* USER ID */
    it('should fail on empty Card ID', () => 
        expect(() => 
               logic.card.unregister(userId, '')
    ).to.throw('Card ID is empty or blank')
    )

     it('should fail on undefined Card ID', () => 
        expect(() => 
               logic.card.unregister(userId, undefined)
    ).to.throw(`Card ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for Card ID', () => 
        expect(() => 
               logic.card.unregister(userId, 123)
    ).to.throw(`Card ID with value 123 is not a string`)
    )
    })
    after(() => mongoose.disconnect())
})
