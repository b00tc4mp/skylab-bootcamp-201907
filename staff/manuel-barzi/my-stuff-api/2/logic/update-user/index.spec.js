require('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('../../data')

const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, body

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

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        updateUser(id, body)
            .then(result => {
                expect(result).not.to.exist

                return User.findById(id)
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(body.name)
                expect(user.surname).to.equal(body.surname)
                expect(user.email).to.equal(body.email)
                expect(user.password).to.equal(body.password)
                expect(user.extra).not.to.exist
            })
    )

    it('should fail on non-existing user', () => {
        id = '5d5d5530531d455f75da9fF9'

        return updateUser(id, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`user with id ${id} does not exist`))
    })

    after(() => database.disconnect())
})