const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')

describe('logic', () => {
    let client, users

    before(() => {
        return data('mongodb://localhost', 'my-api-test')
            .then(({ client: _client, db}) => {
                client = _client

                users = db.collection('users')

                logic.__users__ = users
            })
    })


    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return users.deleteMany()
    })

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

    after(() => client.close())
})
