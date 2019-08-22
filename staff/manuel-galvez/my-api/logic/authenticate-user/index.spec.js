const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../.')

describe('logic', () => {
    let client, users

    before(() => {

        client = new MongoClient('mongodb://localhost', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return client.connect()
            .then(() => {
                const db = client.db('skylab')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('authenticate', () => {
        let name, surname, email, password
        let userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            // Register user first to make sure it exists
            users.insertOne({name, surname, email, password})
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.authenticateUser(email, password)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.equal(userId)
                })
        )

        it('should fail on wrong email', () =>
            logic.authenticateUser('fake@email.com', password)
                .then(data => {
                    expect(data).to.be.undefined
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credentials.')
                })
        )

        it('should fail on wrong password.', () =>
            logic.authenticateUser(email, 'fjañlkfjsadñfk')
                .then(data => {
                    expect(data).to.be.undefined
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credentials.')
                })
        )
      
    })

    after(() => client.close())

})
