require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Chat, Message } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - update chat', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, participantName, participantSurname, 
    participantEmail, participantPassword, id, participantId, chatId, text

    beforeEach( async () => {

        await Message.deleteMany()
        await Chat.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@email.com`
            password = `123-${Math.random()}`

            participantName = `name-${Math.random()}`
            participantSurname = `surname-${Math.random()}`
            participantEmail = `email-${Math.random()}@email.com`
            participantPassword = `123-${Math.random()}`

            text = `bla, bla, bla-${Math.random()}`

            await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                    id = user.id
                const participantUser = await User.create({ name: participantName, surname: participantSurname, email: participantEmail, password: participantPassword })
                    participantId = participantUser.id
                const chat_ = await Chat.create({ participants: [id, participantId] })
                    chatId = chat_.id
            })

    it('should succeed on correct data', async () => {
        const result = await logic.updateChat(id, chatId, text)
            expect(result).not.to.exist
        const chat = await Chat.findById(chatId)
            expect(chat).to.equal(chat)
            expect(chat.messages[0].from.toString()).to.equal(id)
            expect(chat.messages[0].text).to.equal(text)
            expect(chat.participants).to.exist
            })

    it('should fail on unexisting user', async () => {
        try{
            await logic.updateChat('5d5d5530531d455f75da9fF9', chatId, text)
        }catch({ message }){ 
            expect(message).to.equal('User does not exist.')
        }
    })

    it('should fail on unexisting chat', async () => {
        try{
            await logic.updateChat(id, '5d5d5530531d455f75da9fF9', text)
        }catch({ message }){ 
            expect(message).to.equal('Chat does not exist.')
        }
    })

    it('should fail on empty user id', () =>
        expect(() =>
            logic.updateChat('', chatId, text)
        ).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() =>
            logic.updateChat(123, chatId, text)
        ).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty chatId', () =>
        expect(() =>
            logic.updateChat(id, "", text)
        ).to.throw('chat id is empty or blank')
    )

    it('should fail on wrong ChatId type', () =>
        expect(() =>
            logic.updateChat(id, 123, text)
        ).to.throw('chat id with value 123 is not a string')
    )

    it('should fail on empty text', () =>
        expect(() =>
            logic.updateChat(id, chatId, "")
        ).to.throw('text is empty or blank')
    )

    it('should fail on wrong text type', () =>
        expect(() =>
            logic.updateChat(id, chatId, 123)
        ).to.throw('text with value 123 is not a string')
    )

    after(() => database.disconnect())
})