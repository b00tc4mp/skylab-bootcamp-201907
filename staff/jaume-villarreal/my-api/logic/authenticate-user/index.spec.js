const data = require('../../data')
const { expect } = require('chai')
const logic = require('.'.)

describe('logic', () => {
    let client, users

    before(() => {
        data('monogodb://localhost' , 'my-api-test')
            .then( ({ client:_client , database }) => {
                client = _client
                users = database.collection('users')
                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('authenticate', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.authenticateUser(email, password)
                .then(_id => {
                    expect(_id).to.exist
                    expect(_id).to.be.a('string')
                    expect(_id).to.equal(id)
                })
        )

        it('should fail on wrong mail', () =>
            logic.authenticateUser('a@mail.com' , password)
                .then(data => {
                    expect(data).to.be.undefined()
                })
                .catch(error => {
                    expect(error.message).to.equal('user with e-mail a@mail.com does not exist')
                })
        )

        it('should fail on wrong password', () =>
            logic.authenticateUser(email , '123')
                .then(data => {
                    expect(data).to.be.undefined()
                })
                .catch(error => {
                    expect(error.message).to.equal('Wrong credentials')
                })
        )
    })

    describe('update user', () => {
        // TODO
    })

    describe('unregister user', () => {
        // TODO
    })

    after(() => client.close())
})