const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Chat } = models

describe('logic - create chat', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let userName, surname, email, password, userLongitude, userLatitude, userName1, surname1, email1, password1, userLongitude1, userLatitude1, id, participantId

    beforeEach(async () => {

        await Chat.deleteMany()
        await User.deleteMany()

        return (async () => {

            userName = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()} `
            userLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            userLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)
            const user = await User.create({ name: userName, surname, email, password, location: { coordinates: [userLongitude, userLatitude] } })
            id = user.id

            userName1 = `name-${Math.random()}`
            surname1 = `surname-${Math.random()}`
            email1 = `email-${Math.random()}@mail.com`
            password1 = `name-${Math.random()} `
            userLongitude1 = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            userLatitude1 = Number((Math.random() * (-90, 90)).toFixed(3) * 1)
            const user1 = await User.create({ name: userName1, surname: surname1, email: email1, password: password1, location: { coordinates: [userLongitude1, userLatitude1] } })
            participantId = user1.id

        })()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.createChat(id, participantId)
        expect(result).to.exist
        const chat = await Chat.findOne({ _id: result })
        expect(chat).to.exist
    })

    it('should fail if the chat already exists', async () => {
        await Chat.create({ participants: [id, participantId] })
        try {
            await logic.createChat(id, participantId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`chat already exists`)
        }
    })

    it('should fail on unexisting user', async () => {
        try {
            await logic.createChat('5d5d5530531d455f75da9fF9', participantId)
        } catch ({ message }) {
            expect(message).to.equal('User does not exists.')
        }
    })

    it('should fail on unexisting participant user', async () => {
        try {
            await logic.createChat(id, '5d5d5530531d455f75da9fF9')
        } catch ({ message }) {
            expect(message).to.equal('User does not exists.')
        }
    })

    it('should fail on empty user id', () =>
        expect(() =>
            logic.createChat('', participantId)
        ).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() =>
            logic.createChat(123, participantId)
        ).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty participantId', () =>
        expect(() =>
            logic.createChat(id, "")
        ).to.throw('participant id is empty or blank')
    )

    it('should fail on wrong participantId type', () =>
        expect(() =>
            logic.createChat(id, 123)
        ).to.throw('participant id with value 123 is not a string')
    )

    after(() => database.disconnect())
})