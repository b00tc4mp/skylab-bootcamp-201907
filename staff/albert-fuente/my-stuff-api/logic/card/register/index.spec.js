const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - register card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number,expiry

    beforeEach(async() => {

        number = `1-${Math.random()}`
        expiry = `0${Math.floor(Math.random() * 9)}/0${Math.floor(Math.random() * 9)}`
            
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        await Card.deleteMany()
        let user=await User.create({ name, surname, email, password })
        id = user._id.toString()
    })

    it('should succeed on correct data', () =>{
        
        logic.card.register(id, number,expiry)
            .then(result => {
                cardId = result
                expect(cardId).to.exist
                
                return Card.findOne({ cardId })
                
            })
            .then(card => {
                
                expect(card).to.exist
                expect(card.number).to.equal(number)
                expect(card.expiry).to.equal(expiry)
            })}
    
        
    )

   /*  it('should succeed on correct data', async() =>{
        
        logic.card.register(id, number,expiry)
            .then(result => {
                cardId = result
                expect(cardId).to.exist
                
                return Card.findOne({ cardId })
                
            })
            .then(card => {
                
                expect(card).to.exist
                expect(card.number).to.equal(number)
                expect(card.expiry).to.equal(expiry)
            })}
    
        
    ) */

    /* it('should fail if the card already exists', () =>
       Card.create({ number,expiry })
           .then (() => logic.card.register(id, number,expiry)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Card already exists.`)
               })
           )
    )

     it('should fail on empty number', () => 
        expect(() => 
               logic.card.register(id, '', expiry)
    ).to.throw('number is empty or blank')
    )

     it('should fail on undefined number', () => 
        expect(() => 
               logic.card.register(id, undefined, expiry)
    ).to.throw(`number with value undefined is not a string`)
    )

     it('should fail on empty expiry', () => 
        expect(() => 
               logic.card.register(id, number, "")
    ).to.throw(`expiry date with value  is not a valid date`)
    ) */

    after(() => mongoose.disconnect())
})


/* number = `1-${Math.random()}`
            expiry = `"0"+${Math.floor(Math.random() * 9)}/"0"+${Math.floor(Math.random() * 9)}`
             */