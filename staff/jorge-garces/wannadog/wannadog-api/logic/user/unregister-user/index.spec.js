const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User } = models

describe('logic', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    describe('user deletion', () => {

        let name, surname, email, password, id

        beforeEach(async () => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            await User.deleteMany()
            const user = new User({ name, surname, email, password })
            id = user.id
            user.dogs.push("5d7129e6b03f1d1aa25b4923", "5d713fc870c48f631964f4e7")

            await user.save()

        })
        it('should succeed on correct data', async () => {
            const result = await logic.unregisterUser(id, email, password)
            expect(result).not.to.exist
            const userFind = await User.findById(id)
            expect(userFind).not.to.exist

        })
        it('should fail on unexisting user', async () => {
            id = '5d5d5530531d455f75da9fF9'
            try {
                await logic.unregisterUser(id, email, password)
                throw Error('should not reach this point')
            }
            catch ({ message }) {
                expect(message).to.equal('There was an error unregistering the user')
            }

        })
        it('should fail on existing user, but wrong password', async () => {
            password = 'wrong password'
            try {
                await logic.unregisterUser(id, email, password)
                throw Error('should not reach this point')
            }
            catch ({ message }) {
                expect(message).to.equal('There was an error unregistering the user')
            }

        })
        after(() => database.disconnect())
    })
})