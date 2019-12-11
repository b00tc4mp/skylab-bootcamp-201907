const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User } = models

describe('logic', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    describe('user authentication', () => {
        let name, surname, email, password, id, longitude, latitude

        beforeEach(() => {

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()}`
            longitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            latitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

            return (async () => {
                await User.deleteMany()
                const user = new User({ name, surname, email, password })
                user.location.coordinates.push(longitude, latitude)
                id = user.id
                await user.save()
            })()
        })

        it('should authenticate on correct data', async () => {
            const result = await logic.authenticateUser(email, password)
            expect(result).to.exist
            expect(result).to.be.a('string')
            expect(result).to.equal(id)
        })

        it('should fail on incorrect data', async () => {
            let password = "fail"

            try {
                await logic.authenticateUserUser(email, password)
            } catch (error) {
                expect(error).to.exist
            }
        })

        it('should fail on empty email', () => {
            expect(() =>
                logic.authenticateUser('', password)
            ).to.throw(Error, 'email is empty or blank')
        })

        it('should fail on emtpy password', () => {
            expect(() =>
                logic.authenticateUser(email, '')
            ).to.throw(Error, 'password is empty or blank')
        })

        it('should fail on non-valid email', () => {
            expect(() =>
                logic.authenticateUser('asdf#adsf.com', password)
            ).to.throw(Error, 'email with value asdf#adsf.com is not a valid e-mail')
        })

        it('should fail on non-string email', () => {
            expect(() =>
                logic.authenticateUser(undefined, password)
            ).to.throw(Error, 'email with value undefined is not a string')
        })

        it('should fail on non-string password', () => {
            expect(() =>
                logic.authenticateUser(email, undefined)
            ).to.throw(Error, 'password with value undefined is not a string')
        })

        after(() => database.disconnect())

    })
})