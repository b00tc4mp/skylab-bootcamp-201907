require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Chat, Message } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve chat', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, participantName, participantSurname, 
    participantEmail, participantPassword, id, participantId, chatId, text,
    noName, noSurname, noEmail, noPassword, noId 

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

            noName = `name-${Math.random()}`
            noSurname = `surname-${Math.random()}`
            noEmail = `email-${Math.random()}@email.com`
            noPassword = `123-${Math.random()}`

            text = `bla, bla, bla-${Math.random()}`
            date = new Date

            await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                    id = user.id
                const participantUser = await User.create({ name: participantName, surname: participantSurname, email: participantEmail, password: participantPassword })
                    participantId = participantUser.id
                const message = await Message.create({ date, from: id, text })
                const chat_ = await Chat.create({ participants: [id, participantId], message })
                    chatId = chat_.id
                const _user = await User.create({ name: noName, surname: noSurname, email: noEmail, password: noPassword })
                    noId = _user.id
            })
    
    it('should succeed on correct data', async () => {
        const chat = await logic.retrieveChat(id, chatId) 
            expect(chat).to.exist
            expect(chat.id).to.equal(chatId)
            expect(chat.participants[0]).to.equal(id)
            expect(chat.participants[1]).to.equal(participantId)
    })
    
    it('should fail if there are no users', async () =>{ 
        try{
            const res = await logic.retrieveChat('5d65115f8f58cc540cc376ca', chatId)
                expect(res).not.to.exist
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`This user does not exist`)
            }
    })

    it('should fail if the chat does not exist', async () =>{ 
        try{
            const res = await logic.retrieveChat(id, '5d65115f8f58cc540cc376ca')
                expect(res).not.to.exist
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`This chat does not exist`)
            }
    })

    it('should fail if the user does not participate on the chat', async () =>{ 

        try{
        const res = await logic.retrieveChat(noId, chatId)
            expect(res).not.to.exist
        }catch(error) {
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