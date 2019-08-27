Sconst { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('update-user', () => {
        let name, surname, email, password, userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on correct data', () => 
            logic.updateUser("pepito", "menganito", email, "password", userId)
                .then(() => users.findOne({ email }))
                .then((user) => {
                    expect(user).to.exist
                    expect(user.name).to.be.a("string")
                    expect(user.name).to.equal("pepito")
                    expect(user.surname).to.be.a("string")
                    expect(user.surname).to.equal("menganito")
                    expect(user.email).to.be.a("string")
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.a("string")
                    expect(user.password).to.equal("password")
                }) 
            )
    })
    after(() => client.close())
})