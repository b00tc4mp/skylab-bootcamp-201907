const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Chat, Message } = models

describe('logic - update chat', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let userName, surname, email, password, userLongitude, userLatitude, userName1, surname1, email1, password1, userLongitude1, userLatitude1, id, participantId, body

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

            body = `ble, ble, ble-${Math.random()}`

            const chat_ = await Chat.create({ members: [id, participantId] })
            chatId = chat_.id

        })()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.updateChat(id, chatId, body)
        expect(result).not.to.exist
        const chat = await Chat.findById(chatId)
        expect(chat).to.equal(chat)
        expect(chat.messages[0].user.toString()).to.equal(id)
        expect(chat.messages[0].body).to.equal(body)
        expect(chat.members).to.exist
    })

    it('should fail on unexisting user', async () => {
        try {
            await logic.updateChat('5d5d5530531d455f75da9fF9', chatId, body)
        } catch ({ message }) {
            expect(message).to.equal('User does not exist.')
        }
    })

    it('should fail on unexisting chat', async () => {
        try {
            await logic.updateChat(id, '5d5d5530531d455f75da9fF9', body)
        } catch ({ message }) {
            expect(message).to.equal('Chat does not exist.')
        }
    })

    it('should fail on empty user id', () =>
        expect(() =>
            logic.updateChat('', chatId, body)
        ).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() =>
            logic.updateChat(123, chatId, body)
        ).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty chatId', () =>
        expect(() =>
            logic.updateChat(id, "", body)
        ).to.throw('chat id is empty or blank')
    )

    it('should fail on wrong ChatId type', () =>
        expect(() =>
            logic.updateChat(id, 123, body)
        ).to.throw('chat id with value 123 is not a string')
    )

    it('should fail on empty body', () =>
        expect(() =>
            logic.updateChat(id, chatId, "")
        ).to.throw('body is empty or blank')
    )

    it('should fail on wrong body type', () =>
        expect(() =>
            logic.updateChat(id, chatId, 123)
        ).to.throw('body with value 123 is not a string')
    )

    after(() => database.disconnect())
})