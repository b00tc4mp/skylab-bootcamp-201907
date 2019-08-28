const mongoose = require('mongoose')
const logic= require('../../.')
const {expect} = require('chai')
const {User, Card} = require('../../../models')

describe('logic - retrieve all cards', () => {

    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))

    let userId, cardId, number, expiry, name, surname, email, password, expiryDate, expiryDate2

    beforeEach(() => {
    
        number = Number((Math.random() * 10000000000).toFixed())
        expiry = '09/19'
        number2 = Number((Math.random() * 10000000000).toFixed())
        expiry2 = '04/19'
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
       
        return User.deleteMany()
        
            .then(() => User.create({ name, surname, email, password }))
            .then(user => {
                
                userId = user.id

                const dateArray = expiry.split('/')
                const month = Number(dateArray[0])
                const year = Number(`20${dateArray[1]}`)
                expiryDate = new Date(year, month)
                expiryDate2 = new Date(year, month)


                const newCard = new Card({ number, expiry: expiryDate })
                cardId = newCard.id
                const newCard2 = new Card({ number: number2, expiry: expiryDate2 })
                cardId2 = newCard2.id
                user.cards.push(newCard)
                user.cards.push(newCard2)
                return user.save()
                
            })
    })

    it('should succeed on correct data', () =>{
        return logic.card.retrieveAll(userId)
        
            .then(cards=> {
                // Format expiry to valid date
                expect(cards).to.exist
                
                const card1 = cards.find(card => card.id.toString() === cardId)
                const card2 = cards.find(card => card.id.toString() === cardId2)
                expect(card1.number).to.equal(number)
                expect(card2.number).to.equal(number2)
                expect(card1.expiry).to.deep.equal(expiryDate)
                expect(card2.expiry).to.deep.equal(expiryDate2)
                
            })
        
        })

        it('should fail if user does not exist', () =>
        User.deleteMany()
        .then(() => User.findById(userId))
        .then(user => expect(user).not.to.exist)
        .catch(error => {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${cardId} does not exist.`)
        })
    )
   
    /* USER ID */
    it('should fail on empty User ID', () =>
        expect(() =>                logic.card.retrieveAll('', cardId)
    ).to.throw('id is empty or blank')
    )
        it('should fail on undefined User ID', () =>
        expect(() =>                logic.card.retrieveAll(undefined, cardId)
    ).to.throw(`id with value undefined is not a string`)
    )
        it('should fail on wrong data type for User ID', () =>
        expect(() =>                logic.card.retrieveAll(123, cardId)
    ).to.throw(`id with value 123 is not a string`)
    )
            
     after(() => mongoose.disconnect())



})


