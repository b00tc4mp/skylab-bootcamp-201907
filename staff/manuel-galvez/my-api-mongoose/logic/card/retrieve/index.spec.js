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

    describe('retrieve user', () => {
        let userId, name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            // Register user first to make sure it exists
            return users.insertOne({name, surname, email, password})
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user).to.exist
                    expect(user.id).to.equal(userId)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).not.to.exist
            })
        )
    })

    after(() => client.close())
})