const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User } = models

describe('logic', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    describe('retrieve user', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return (async () => {
                await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                id = user.id
            })()
        })

        it('should succeed on correct data', async () => {
            const user = await logic.retrieveUser(id)
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id).not.to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).not.to.exist
        })

        it('should fail on empty id', () => {
            expect(() =>
                logic.retrieveUser('')
            ).to.throw(Error, 'id is empty or blank')
        })

        it('should fail on emtpy password', () => {
            expect(() =>
                logic.retrieveUser(undefined)
            ).to.throw(Error, 'id with value undefined is not a string')
        })

        it('should fail on non-valid email', () => {
            expect(() =>
                logic.retrieveUser(123)
            ).to.throw(Error, 'id with value 123 is not a string')
        })
    })

    after(() => database.disconnect())

})