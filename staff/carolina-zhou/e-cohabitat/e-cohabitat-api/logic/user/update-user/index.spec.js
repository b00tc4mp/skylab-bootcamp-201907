require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User } } = require('data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {
    before(() => database.connect(DB_URL_TEST))

    let username, name, surname, email, password, id, dataToUpdate

    beforeEach(async() => {
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        dataToUpdate = {
            name: `newName-${Math.random()}`,
            surname: `newSurname-${Math.random()}`,
            email: `newemail-${Math.random()}@domain.com`,
            password: `newPassword-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }
        
        const user = await User.create({ username, name, surname, email, password: await bcrypt.hash(password, 10) })
        id = user.id
    })
 
    it('should succeed on correct data', async() => {
        const result = await logic.updateUser(id, dataToUpdate)
        expect(result).not.to.exist

        const user = await User.findById(id)
        expect(user).to.exist
        expect(user.name).to.equal(dataToUpdate.name)
        expect(user.surname).to.equal(dataToUpdate.surname)
        expect(user.email).to.equal(dataToUpdate.email)
        expect(user.password).to.exist
        expect(user.extra).to.equal(dataToUpdate.extra)
    })

    it('should fail on non-existent user', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.updateUser(id, dataToUpdate)

            throw new Error('should not reach this point')
        } catch({ message }) {
            expect(message).to.equal(`user with id ${id} does not exist`)
        }
    })

    it('should fail on empty id', async () => {
        id = ''

        try{
            await logic.updateUser(id, dataToUpdate)
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

        try{
            await logic.updateUser(id, dataToUpdate)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
        id = 123

        try{
            await logic.updateUser(id, dataToUpdate)
        } catch({ message }) {
            expect(message).to.equal("user id with value 123 is not a string")
        }
    })

    it('should fail on empty body', async () => {
        dataToUpdate = ''

        try{
            await logic.updateUser(id, dataToUpdate)
        } catch({ message }) {
            expect(message).to.equal('body is empty or blank')
        }
    })

    it('should fail on undefined body', async () => {
        dataToUpdate = undefined

        try{
            await logic.updateUser(id, dataToUpdate)
        } catch({ message }) {
            expect(message).to.equal("body with value undefined is not an object")
        }
    })
     
    it('should fail on wrong body data type', async() => {
        dataToUpdate = 123

        try{
            await logic.updateUser(id, dataToUpdate)
        } catch({ message }) {
            expect(message).to.equal("body with value 123 is not an object")
        }
    })

    after(() => database.disconnect())
})