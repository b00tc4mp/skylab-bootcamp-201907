require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password

    beforeEach(async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        await User.deleteMany()

    })

    it('should succeed on correct data', async () => {
        
        await registerUser(name, surname, email, password, )

        const user =  await User.findOne({email})

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)

    })

    it('error because e-mail already exist', async() => {
        await User.create({name, surname, email, password })
        
        try{

            await registerUser(name, surname, email, password)

        }catch(error){
            
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)
        }

        await User.deleteMany()
    })

    after(() => database.disconnect())
})