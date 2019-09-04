const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User } = require('../../../models')


describe('logic - update user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let name, surname, email, password, id, body

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        body = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.user.update(id, body)
        
        expect(result).not.to.exist

        const user = await User.findById(id)
            expect(user).to.exist
            expect(user.name).to.equal(body.name)     
            expect(user.surname).to.equal(body.surname)
            expect(user.email).to.equal(body.email)
            expect(user.password).to.equal(body.password)
            expect(user.extra).to.not.exist
    })

    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'
        try{
            await logic.user.update(id, body )
        }catch({ message }){
            expect(message).to.equal(`user with id ${id} does not exist`)
        }
    })

    it('should fail on empty id', async () => {
        try{
          await logic.user.update('', body)
      } catch({ message }) {
          expect(message).to.equal("id is empty or blank")
      }
  })
  it('should fail on undefined id', async () => {
      try{
        await logic.user.update(undefined)
    } catch({ message }) {
        expect(message).to.equal("id with value undefined is not a string")
    }
 })
 it('should fail on wrong id data type', async() => {
     try{
            await logic.user.update(123)
        } catch({ message }) {
            expect(message).to.equal("id with value 123 is not a string")
        }
   
 })

    after(() => mongoose.disconnect())
})