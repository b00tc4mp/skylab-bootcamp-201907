const data = require('../../data')
const { expect } = require('chai')
const logic = require('..')

describe('logic', () => {
    let client, users

    before(() => {
        data('monogodb://loclahost' , 'my-api-test')
            .then( ({ client:_client , database }) => {
                client = _client
                users = database.collection('users')
                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

     describe('register', () => {
        let name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
        })

        it('should succeed on correct data', () =>
            logic.registerUser(name, surname, email, password, password)
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
    })
    after(() => client.close())
})