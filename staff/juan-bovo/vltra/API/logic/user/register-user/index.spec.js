require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {

    before(() =>  database.connect(DB_URL_TEST))
        
    let name, surname, nickname, email, password

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result = await registerUser(name, surname, nickname, email, password, password)
            
        expect(result).not.to.exist
        const user = await User.findOne({ email })
    
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.nickname).to.equal(nickname)
        expect(user.email).to.equal(email)
        expect(user.password).to.eq(password)
    })

    after(() => database.disconnect())
})