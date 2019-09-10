const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Chat, Message } = models

describe('logic - update chat', () => {

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
        const chat = await logic.retrieveAllChats(id)
        debugger
        expect(chat).to.exist
        expect(chat[0].id).to.equal(chatId)
        expect(chat[0].members[0]).to.deep.equal(id)
        expect(chat[0].members[1]).to.deep.equal(participantId)
    })

    it('should fail if there are no users', async () => {
        try {
            const res = await logic.retrieveAllChats('5d65115f8f58cc540cc376ca')
            expect(res).not.to.exist
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not exist.`)
        }
    })

    it('should fail if the user does not own chats', async () => {

        try {
            const res = await logic.retrieveAllChats(noId)
            expect(res).not.to.exist
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not own any chats`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() =>
            logic.retrieveAllChats('')
        ).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() =>
            logic.retrieveAllChats(123)
        ).to.throw('user id with value 123 is not a string')
    )

    after(() => database.disconnect())
})