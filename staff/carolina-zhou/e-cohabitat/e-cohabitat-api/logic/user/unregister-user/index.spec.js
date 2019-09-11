require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User } } = require('data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister user', () => {

    before(() => database.connect(DB_URL_TEST))

    let username, name, surname, email, password, id

    beforeEach(async() => {
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        const hash = await bcrypt.hash(password, 10)

        await User.deleteMany()
        const user = await User.create({ username, name, surname, email, password: hash })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterUser(id, password)
        expect(result).not.to.exist

        const user = await User.findById(id)
        expect(user).not.to.exist
    })

    it('should fail on unexistent user', async () => {
        id =  '5d5d5530531d455f75da9fF9'

        try {
            await logic.unregisterUser(id, password)
            
            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on wrong password', async () => {
        password = 'wrong password'

        try {
            await logic.unregisterUser(id, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on empty id', async () => {
        id = ' '

        try{
            await logic.unregisterUser(id, password)
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

          try{
            await logic.unregisterUser(id, password)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
        id = 123

         try{
                await logic.unregisterUser(id, password)
            } catch({ message }) {
                expect(message).to.equal("user id with value 123 is not a string")
            }
       
    })

    it('should fail on empty password', async () => {
        password = ' '

        try{
            await logic.unregisterUser(id, password)
        } catch({ message }) {
            expect(message).to.equal('password is empty or blank')
        }
    })

    it('should fail on undefined password', async () => {
        password = undefined

          try{
            await logic.unregisterUser(id, password)
        } catch({ message }) {
            expect(message).to.equal("password with value undefined is not a string")
        }
    })
     
    it('should fail on wrong password data type', async() => {
        password = 123

         try{
            await logic.unregisterUser(id, password)
        } catch({ message }) {
             expect(message).to.equal("password with value 123 is not a string")
        }
       
    })

    after(() => database.disconnect())
})