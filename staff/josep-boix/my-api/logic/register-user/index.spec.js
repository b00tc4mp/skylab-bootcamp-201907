const { expect } = require ('chai')
const logic = require ('..')
const data = require ('../../data')

describe ('register user', () => {
    let client, users 
    
    beforeEach(() => {
        return data ('mongodb://localhost', 'my-api-test')
            .then(({client: _client, db}) => {
                client = _client

                users = db.collection ('users')

                logic.__users__ = users
            })
    })

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        return users.deleteMany()
    })

    it ('should success on correct data', () =>
        logic.registerUser(name, surname, email, password, password)
            .then (result => {
                expect (result).not.to.exist

                return users.findOne({email})
            })
            .then (user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    it ('should fail if user was already registered', () =>
        logic.registerUser (name, surname, 'josepboixvillar@gmail.com', password, password)
            .then (user => {
                expect (user).to.undefined
            })
            .catch (error => {
                expect (error).to.exist
                expect (error.message).to.equal (`User with email josepboixvillar@gmail.com already exists.`)
            })
    )

    it ('should fail on empty name data', () =>
        expect (() =>  {logic.registerUser('', surname, email, password)}).to.throw ('name is empty or blank')
    )

    it ('should fail on empty surname data', () =>
        expect (() =>  {logic.registerUser(name, '', email, password)}).to.throw ('surname is empty or blank')
    )

    it ('should fail on empty email data', () =>
        expect (() =>  {logic.registerUser(name, surname, '', password)}).to.throw ('email is empty or blank')
    )

    it ('should fail on empty password data', () =>
        expect (() =>  {logic.registerUser(name, surname, email, '')}).to.throw ('password is empty or blank')
    )

    after(() => client.close())
})