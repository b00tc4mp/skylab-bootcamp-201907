const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../models')
const mongoose = require('mongoose')

describe('logic - retrieve user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user=await User.create({ name, surname, email, password })
            id = user.id
    })

    it('should succeed on correct data', async() =>{
        const user=await logic.user.retrieve(id)
        
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id).not.to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).not.to.exist
  
    })
    it('should throw an error with a wrong id',async () =>{
        try{
            await logic.user.retrieve("5d5fe532b4f3f827e6fc64f8")

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`User with id 5d5fe532b4f3f827e6fc64f8 does not exist.`)

        }
    })
    after(() => mongoose.disconnect())
})