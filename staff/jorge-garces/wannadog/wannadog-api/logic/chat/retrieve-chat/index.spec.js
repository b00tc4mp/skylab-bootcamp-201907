const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Chat, Message } = models

describe.only('logic - update chat', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let userName, surname, email, password, userLongitude, userLatitude, userName1, surname1, email1, password1, userLongitude1, userLatitude1, id, participantId, body, noId, nouserName, noSurname, noEmail, noPassword, nouserLongitude, nouserLatitude, date

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

            nouserName = `name-${Math.random()}`
            noSurname = `surname-${Math.random()}`
            noEmail = `email-${Math.random()}@mail.com`
            noPassword = `name-${Math.random()} `
            nouserLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            nouserLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

            const nouser = await User.create({ name: nouserName, surname: noSurname, email: noEmail, password: noPassword, location: { coordinates: [nouserLongitude, nouserLatitude] } })
            noId = nouser.id

            date = new Date
            body = `ble, ble, ble-${Math.random()}`

            const message = await Message.create({ date, from: id, body })

            const chat_ = await Chat.create({ members: [id, participantId], message })
            chatId = chat_.id

            const _user = await User.create({ name: nouserName, surname: noSurname, email: noEmail, password: noPassword })
            noId = _user.id

        })()
    })

    it('should succeed on correct data', async () => {
        const chat = await logic.retrieveChat(id, chatId)
        expect(chat).to.exist
        expect(chat.id).to.equal(chatId)
        expect(chat.members[0]).to.equal(id)
        expect(chat.members[1]).to.equal(participantId)
    })

    it('should fail if there are no users', async () => {
        try {
            const res = await logic.retrieveChat('5d65115f8f58cc540cc376ca', chatId)
            expect(res).not.to.exist
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not exist`)
        }
    })

    it('should fail if the chat does not exist', async () => {
        try {
            const res = await logic.retrieveChat(id, '5d65115f8f58cc540cc376ca')
            expect(res).not.to.exist
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`This chat does not exist`)
        }
    })

    it('should fail if the user does not participate on the chat', async () => {

        try {
            const res = await logic.retrieveChat(noId, chatId)
            expect(res).not.to.exist
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not own this chat`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() =>
            logic.updateChat('', chatId)
        ).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() =>
            logic.updateChat(123, chatId)
        ).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty chat id', () =>
        expect(() =>
            logic.updateChat(id, '')
        ).to.throw('chat id is empty or blank')
    )

    it('should fail on wrong chat id type', () =>
        expect(() =>
            logic.updateChat(id, 123)
        ).to.throw('chat id with value 123 is not a string')
    )

    after(() => database.disconnect())
})