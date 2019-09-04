const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User } = models

describe('logic-update user', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    beforeEach(async () => {
        await User.deleteMany()
    })
    describe('update user', () => {
        let id, name, surname, email, password
        beforeEach(() => {

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()}`
            longitude = Number((Math.random() * 180).toFixed(2))
            latitude = Number((Math.random() * 180).toFixed(2))

            return (async () => {
                await User.deleteMany()
                const user = new User({ name, surname, email, password })
                user.location.coordinates.push(longitude, latitude)
                id = user.id
                await user.save()
            })()
        })

        it('should succeed on correct data', async () => {

            const user = await logic.updateUser(id, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword', location: { coordinates: [123, 456] } })

            expect(user).not.to.exist

            const userUpdate = await User.findOne({ _id: id })
            expect(userUpdate).to.exist
            expect(userUpdate.name).to.equal('newName')
            expect(userUpdate.surname).to.equal('newSurname')
            expect(userUpdate.email).to.equal('new@email.com')
            expect(userUpdate.password).to.equal('newPassword')
            expect(userUpdate.location.coordinates).to.deep.equal([123, 456])

        })
        it('should fail on empty id', () =>
            expect(() =>
                logic.updateUser('', { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id is empty or blank')
        )
        it('should fail on undefined id', () =>
            expect(() =>
                logic.updateUser(undefined, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id with value undefined is not a string')
        )
    })
    after(() => database.disconnect())
})