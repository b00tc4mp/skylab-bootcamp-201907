const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')

describe('logic - register user', () => {
    let client, users

    let name, surname, email, password

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    before(() =>
        data('mongodb://localhost', 'my-api-test')
            .then(({ client: _client, db }) => {
                client = _client

                users = db.collection('users')

                logic.__users__ = users
            })
            .then(() => users.deleteMany())
    )

    it('should succeed on correct data', () =>
        logic.registerUser(name, surname, email, password)
            .then(result => {
                expect(result).not.to.exist

                return users.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    it('should fail on existing email', () =>
        logic.registerUser(name, surname, email, password)
            .catch(error => expect(error.message).to.equal(`user with e-mail ${email} already exists`))
    )

    after(() => client.close())
})