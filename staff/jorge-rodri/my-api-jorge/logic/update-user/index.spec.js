const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../update-user')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost', { useUnifiedTopology: true })

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('update', () => {
        let name, surname, email, password, id, user
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should succeed on correct data', () => { 
            const update = { name: "Jaumpi", surname: "Sorete" }
            logic.updateUser(id, update)
                .then((user) => users.findOne( user.name ))
                .then(user => {
                    expect(user.name).to.equal(update.name)
                })
        })

        it('wrong id', () => {
            const update = { name: "Jorge", surname: "Fuente" }
            debugger
            logic.updateUser('123456789541651651121113', update)
                .then(() => { })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal('User not updated.')
                })
        })
        after(() => client.close())
    })
})