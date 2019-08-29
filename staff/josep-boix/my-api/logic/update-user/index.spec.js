const { MongoClient } = require('mongodb')
const logic = require('..')
const { expect } = require('chai')
const { ObjectId } = require('mongodb')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient ('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology:true })
        return client.connect()
        
            .then (() => {
                debugger
                const db = client.db ('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach (() => users.deleteMany())

    describe('update user', () => {
        let name, surname, email, password, id, body

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`

            body = {
                name: `name-${Math.random()}`,
                surname: `surname-${Math.random()}`,
                email: `email-${Math.random()}@mail.com`,
                password: `password-${Math.random()}`,
                extra: `extra-${Math.random()}`
            }

            return users.deleteMany()
                .then(() => users.insertOne({ name, surname, email, password }))
                .then(result => id = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.updateUser(id, body)
                .then(result => {
                    expect(result).not.to.exist

                    return users.findOne({ _id: ObjectId(id) })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(body.name)
                    expect(user.surname).to.equal(body.surname)
                    expect(user.email).to.equal(body.email)
                    expect(user.password).to.equal(body.password)
                    expect(user.extra).to.equal(body.extra)
                })
        )

        it('should fail on non-existing user', () => {
            id = '5d5d5530531d455f75da9fF9'

            return logic.updateUser(id, body)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => expect(message).to.equal(`user with id ${id} does not exist`))
        })

    })
    after(() => client.close())
})