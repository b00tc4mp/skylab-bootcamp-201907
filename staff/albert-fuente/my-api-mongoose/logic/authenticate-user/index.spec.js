const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../data')
const mongoose = require('mongoose')


describe('logic - authenticate user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password })
                .then(user => id = user.id))
    })

    it('should succeed on correct data', () =>
        logic.authenticateUser(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )
    it('should fail on wrong email', () =>
    logic.authenticateUser('fake@email.com', password)
        .then(data => {
            expect(data).to.be.undefined
        })
        .catch(error => {
            
            expect(error).to.exist
            expect(error.message).to.equal(`user with e-mail fake@email.com does not exist`)
        })
)

it('should fail on wrong password.', () =>
    logic.authenticateUser(email, 'fjañlkfjsadñfk')
        .then(data => {
            expect(data).to.be.undefined
        })
        .catch(error => {
            expect(error).to.exist
            expect(error.message).to.equal(`wrong credentials`)
        })
)

    after(() => mongoose.disconnect())
})