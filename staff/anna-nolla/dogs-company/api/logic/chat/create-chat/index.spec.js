require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Chat } } = require('data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - create chat', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, participantName, participantSurname, participantEmail, participantPassword

    beforeEach( async () => {

        await Chat.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@email.com`
            password = `123-${Math.random()}`

            participantName = `name-${Math.random()}`
            participantSurname = `surname-${Math.random()}`
            participantEmail = `email-${Math.random()}@email.com`
            participantPassword = `123-${Math.random()}`


            await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                    id = user.id
                const participantUser = await User.create({ name: participantName, surname: participantSurname, email: participantEmail, password: participantPassword })
                    participantId = participantUser.id
            })

    it('should succeed on correct data', async () => {
        const result = await logic.createChat(id, participantId)
            expect(result).to.exist
            const chat = await Chat.findOne({ _id: id })
                expect(chat).to.exist
            })

    it('should fail if the chat already exists', async () => {
        await Chat.create({ participants: [id, participantId] })
            try {
                await logic.createChat(id, participantId)
            }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`chat already exists.`)
            }
    })

    it('should fail on unexisting user', async () => {
        try{
            await logic.createChat('5d5d5530531d455f75da9fF9', participantId)
        }catch({ message }){ 
            expect(message).to.equal('User does not exists.')
        }
    })

    it('should fail on unexisting participant user', async () => {
        try{
            await logic.createChat(id, '5d5d5530531d455f75da9fF9')
        }catch({ message }){ 
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

    it('should fail on wrong address type', () =>
        expect(() =>
            logic.createChat(id, 123)
        ).to.throw('participant id with value 123 is not a string')
    )

    after(() => database.disconnect())
})