require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Notification } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - create notification', () => {

    before(() => database.connect(DB_URL_TEST))

    let title, text, name, surname, email, password, id

    beforeEach( async () => {

        
        await Notification.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            title = `name-${Math.random()}`
            text = `text-${Math.random()}`

            await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                id = user.id
    })

    it('should succeed on correct data', async () =>{
        const notificationId = await logic.createNotification(id, title, text)
            expect(notificationId).to.exist
            const user = await User.findOne({ "notification._id": notificationId })
                expect(user).to.exist
                expect(user.notification[0].title).to.equal(title)
                expect(user.notification[0].text).to.equal(text)
    })

    it('should fail if the notification already exists', async () => {
        notificationId = new Notification({ title, text })
        const user = await User.findById(id)
            await user.save(notificationId)
        try{
            await logic.createNotification(id, title, text)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Notification already exists`)
        }
    })

    it('should fail on unexisting user', () =>
        logic.createNotification('5d5d5530531d455f75da9fF9', title, text)
            .catch(({ message }) => expect(message).to.equal(`User does not exists.`))
    )

    it('should fail on empty user id', () =>
        expect(() => logic.createNotification("", title, text)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.createNotification(123, title, text)).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty title', () =>
        expect(() => logic.createNotification(id, "", text)).to.throw('title is empty or blank')
    )

    it('should fail on wrong title type', () =>
    expect(() => logic.createNotification(id, 123, text)).to.throw('title with value 123 is not a string')
    )
    
    it('should fail on empty text', () =>
    expect(() => logic.createNotification(id, title, "")).to.throw('text is empty or blank')
    )

    it('should fail on wrong text type', () =>
    expect(() => logic.createNotification(id, title, 123)).to.throw('text with value 123 is not a string')
    )

    after(() => database.disconnect())
})