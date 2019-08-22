const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')
const { ObjectId } = require('mongodb')

describe('logic', () => {
    let client, users

    before(() => {
        data('mongodb://localhost' , 'my-api-test')
            .then( ({ client:_client , database}) => {
                client = _client
                users = database.collection('users')
                logic.__users__ = users
            })
    })

     beforeEach(() => users.deleteMany())

     describe('update user', () => {
        let name, surname, email, password, userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            body = {
                name: `name-${Math.random()}`,
                surname: `surname-${Math.random()}`,
                email: `email-${Math.random()}@domain.com`,
                password: `password-${Math.random()}`,
                extra: `extra-${Math.random()}`
            }

            return users.insertOne({ name, surname, email, password })
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
        logic.updateUser(userId, body)
            .then(result => {
                expect(result).not.to.exist

                return users.findOne({ _id: ObjectId(userId) })
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
        userId = '5d5d5530531d455f75da9fF9'

        return logic.updateUser(userId, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`user with id ${userId} does not exist`))
    })
    })
    after(() => client.close)
})