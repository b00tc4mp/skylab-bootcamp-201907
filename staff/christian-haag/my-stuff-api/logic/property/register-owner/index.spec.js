const { MongoClient, ObjectId } = require('mongodb')
const { expect } = require('chai')
const logic = require('../.')

describe('logic -  register-owner', () => {


    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    beforeEach(() => users.deleteMany())

    describe('register a new owner', () => {
        let name, surname, email, password
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        //TO DO
    })
    after(() => client.close())
})