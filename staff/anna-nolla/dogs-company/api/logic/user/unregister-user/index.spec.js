require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach( async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name, surname, email, password })
            id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterUser(id, password)
            expect(result).not.to.exist
            const user = await User.findById(id)
                expect(user).not.to.exist
    })

    it('should fail on unexisting user', async () =>{
        try{
            await logic.unregisterUser('5d5d5530531d455f75da9fF9', password)
            throw Error('should not reach this point')
        } catch({ message }) {
            expect(message).to.equal('Wrong credentials')
        }   
    })

    it('should fail on existing user, but wrong password', async () =>{
        try{
            await logic.unregisterUser(id, 'wrong-password')
            throw Error('should not reach this point') 
        } catch({ message }){
            expect(message).to.equal('Wrong credentials')
        }
    })

    it('should fail on empty id', () => 
        expect(() => logic.unregisterUser("", password)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong id type', () => 
       expect(() => logic.unregisterUser(123, password)).to.throw('user id with value 123 is not a string')
    )
   
    it('should fail on empty password', () => 
        expect(() => logic.unregisterUser(id, "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password type', () => 
       expect(() => logic.unregisterUser(id, 123)).to.throw('password with value 123 is not a string')
    )

    after(() => database.disconnect())
})