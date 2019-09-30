const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - unregister card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let name , surname , email , password , number , expiration , userId , cardId
    beforeEach( async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        number = Math.random()
        expiration = new Date()
        await User.deleteMany()
        const user = await User.create({ name , surname , email , password })
        userId = user.id
        const card = await new Card({ userId , number , expiration })
        cardId = card.id
        user.cards.push(card)
        return await user.save()

    })
    it("should succeed on correct data" , async () =>{
        const result = await logic.card.unregister(userId , cardId)
        expect(result).not.to.exist
    })
    it("should fail on unexisting user" , async () => {
        try{
            await logic.card.unregister('5d5d5530531d455f75da9fF9' , cardId)
        } catch({ message }){
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })
    it("should fail on unexisting card" , async () => {
        try{
            await logic.card.unregister(userId , '5d5d5530531d455f75da9fF9')
        } catch({ message }){
            expect(message).to.equal('card with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })
    it('should fail on empty user id', () => 
        expect(() => logic.card.unregister("" , cardId)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.card.unregister(123 , cardId)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty card id', () => 
        expect(() => logic.card.unregister(userId , "")).to.throw('card id is empty or blank')
    )
    
    it('should fail on wrong card id type', () => 
        expect(() => logic.card.unregister(userId , 123)).to.throw('card id with value 123 is not a string')
    )
    after(() => mongoose.disconnect())
})