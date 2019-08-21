const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost') //Create a new MongoClient instance.

        return client.connect() //Connect to MongoDB using a url
            .then(() => {
                const db = client.db('my-api-test')

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
    })

    it('should succeed on correct data', () =>
        logic.registerUser(name, surname, email, password)
            .then(() => users.findOne({ email }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )
    
    // it('should fail on empty data', () =>
    //     logic.registerUser('', surname, email, password)
    //         // .then(() => users.findOne({ email }))
    //         .then(user => {
    //             expect(user).to.exist
    //             expect(user.name).to.equal(name)
    //             expect(user.surname).to.equal(surname)
    //             expect(user.email).to.equal(email)
    //             expect(user.password).to.equal(password)
    //         })
    // )

    after(() => client.close())
})