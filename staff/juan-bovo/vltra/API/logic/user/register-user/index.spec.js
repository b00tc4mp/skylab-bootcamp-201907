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
        const result = await registerUser(name, surname, nickname, email, password)
            
        expect(result).not.to.exist
        const user = await User.findOne({ email })
    
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.nickname).to.equal(nickname)
        expect(user.email).to.equal(email)
        expect(user.password).to.eq(password)
    })

    it('should fail if the mail already exists', async () => {
        await User.create({ name, surname, nickname, email, password })
            try{
                await registerUser(name, surname, nickname, email, password)
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                }
    })
    it('should fail on empty name', () =>
        expect(() => registerUser("", surname, nickname, email, password)).to.throw('name is empty or blank')
    )
    it('should fail on wrong name type', () =>
        expect(() => registerUser(123, surname, nickname, email, password)).to.throw('name with value 123 is not a string')
    )
    it('should fail on empty surname', () =>
        expect(() => registerUser(name, "", nickname, email, password)).to.throw('surname is empty or blank')
    )
    it('should fail on wrong surname type', () =>
        expect(() => registerUser(name, 123, nickname, email, password)).to.throw('surname with value 123 is not a string')
    )

    it('should fail on empty nickname', () =>
        expect(() => registerUser(name, surname, "", email, password)).to.throw('nickname is empty or blank')
    )

    it('should fail on wrong name type', () =>
        expect(() => registerUser(name, surname, 123, email, password)).to.throw('nickname with value 123 is not a string')
    )
    
    it('should fail on empty email', () =>
        expect(() => registerUser(name, surname, nickname, "", password)).to.throw('email is empty or blank')
    )
    it('should fail on wrong email format', () =>
        expect(() => registerUser(name, surname, nickname, "123@mailcom", password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )
    it('should fail on wrong email type', () =>
        expect(() => registerUser(name, surname, nickname, 123, password)).to.throw('email with value 123 is not a string')
    )
    it('should fail on empty password', () =>
        expect(() => registerUser(name, surname, nickname, email, "")).to.throw('password is empty or blank')
    )
    it('should fail on wrong password type', () =>
        expect(() => registerUser(name, surname, nickname, email, 123)).to.throw('password with value 123 is not a string')
    )
 

    after(() => database.disconnect())
})