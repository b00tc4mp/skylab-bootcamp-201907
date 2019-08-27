const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('skylab')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('retrieve userS', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            function createUser(){
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            }

            return users.insertMany([{ createUser }, { createUser }, { createUser }, { createUser }])
                .then(result => id = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.retrieveUser(id)
                .then(user => {
                    expect(user).to.exist
                    expect(user.id).to.equal(id)
                    expect(user._id).not.to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).not.to.exist
                })
        )
    })

    after(() => client.close())

})
