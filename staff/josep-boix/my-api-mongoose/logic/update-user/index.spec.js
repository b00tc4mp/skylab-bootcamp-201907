const { User } = require('../../data')
const mongoose = require ('mongoose')
const logic = require('..')
const { expect } = require('chai')

describe ('logic', () => {

    before(() => {
        mongoose.connect('mongodb://localhost/my-api-test', {useNewUrlParser: true})
    })

    beforeEach (() => User.deleteMany())

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

            return User.deleteMany()
                .then(() => User.create({ name, surname, email, password, password }))
                .then(result => id = result.id)
        })

        it('should succeed on correct data', () =>
            logic.updateUser(id, body)
                .then(result => {
                    expect(result).not.to.exist

                    return User.findOne({ _id: id })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(body.name)
                    expect(user.surname).to.equal(body.surname)
                    expect(user.email).to.equal(body.email)
                    expect(user.password).to.equal(body.password)
                    expect(user.extra).to.undefined
                    expect(user.extra).not.to.exist
                    expect(body.extra).to.exist
                })
        )

        it('should fail on non-existing user', () => {
            id = '5d5d5530531d455f75da9fF9'

            return logic.updateUser(id, body)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => expect(message).to.equal(`user with id ${id} does not exist`))
        })

    })
    after(() => mongoose.disconnect())
})