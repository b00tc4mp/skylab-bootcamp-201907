require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, nickname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name, surname, nickname, email, password })
            id = user.id
    })

    it('should succeed on correct data', async() =>{
         const result = await retrieveUser(id)
            debugger
                expect(result).to.exist
                expect(result.id).to.equal(id)
                expect(result._id).not.to.exist
                expect(result.name).to.equal(name)
                expect(result.surname).to.equal(surname)
                expect(result.nickname).to.equal(nickname)
                expect(result.email).to.equal(email)
                expect(result.password).not.to.exist
    })

    it('should fail on empty id', async () => {
        try{
            await retrieveUser(' ')

        } catch({ message }) {
            expect(message).to.equal('id is empty or blank')
        }
    })

     it('should fail on undefined id', async () => {

          try{
            await retrieveUser(undefined)

        } catch({ message }) {
            expect(message).to.equal("id with value undefined is not a string")
        }
     })

     it('should fail on wrong id data type', async() => {
         try{
                await retrieveUser(123)

            } catch({ message }) {
                expect(message).to.equal("id with value 123 is not a string")
            }
       
     })

    after(() => database.disconnect())
})