require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Notification } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - update notification', () => {

    before(() => database.connect(DB_URL_TEST))

    let title, text, name, surname, email, password, id, notificationId, titlep, textp

    beforeEach( async () => {

        
        await Notification.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            title = `name-${Math.random()}`
            text = `text-${Math.random()}`
            titlep = `bla-${Math.random()}`
            textp = `parapapa-${Math.random()}`

            await User.deleteMany()
                const notification = await new Notification({ title, text })
                    notificationId = notification.id
                const user = await User.create({ name, surname, email, password, notification })
                    id = user.id
    })

    it('should succeed on correct data', async () =>{
        const notId = await logic.updateNotification(id, notificationId, { 'title': titlep, 'text': textp } )
            expect(notId).not.to.exist
             
            const user = await User.findOne({ "notification._id": notificationId })
                expect(user).to.exist
                expect(user.notification[0].title).to.equal(titlep)
                expect(user.notification[0].text).to.equal(textp)
    })

    it('should fail if the notification does not exist', async () => {
        const user = await User.findById(id)
            await user.save(notificationId)
        try{
            await logic.updateNotification(id, '5d5d5530531d455f75da9fF9', {'title': titlep, 'text': textp})
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`This user has no notifications`)
        }
    })

    it('should fail on unexisting user', () =>
        logic.updateNotification('5d5d5530531d455f75da9fF9', notificationId, {'title': titlep, 'text': textp})
            .catch(({ message }) => expect(message).to.equal(`User does not exists.`))
    )

    it('should fail on empty user id', () =>
        expect(() => logic.updateNotification("", notificationId, {'title': titlep, 'text': textp})).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.updateNotification(123, notificationId, {'title': titlep, 'text': textp})).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty notification id', () =>
        expect(() => logic.updateNotification(id, "",  {'title': titlep, 'text': textp})).to.throw('notification id is empty or blank')
    )

    it('should fail on wrong notification id type', () =>
        expect(() => logic.updateNotification(id, 123,  {'title': titlep, 'text': textp})).to.throw('notification id with value 123 is not a string')
    )
    
    it('should fail on empty title', () =>
        expect(() => logic.updateNotification(id, notificationId, {'title': '', 'text': textp})).to.throw('title is empty or blank')
    )

    it('should fail on wrong title type', () =>
        expect(() => logic.updateNotification(id, notificationId, {'title': 123, 'text': textp})).to.throw('title with value 123 is not a string')
    )

    it('should fail on empty text', () =>
        expect(() => logic.updateNotification(id, notificationId, {'title': titlep, 'text': ''})).to.throw('text is empty or blank')
    )

    it('should fail on wrong text type', () =>
        expect(() => logic.updateNotification(id, notificationId, {'title': titlep, 'text': 123})).to.throw('text with value 123 is not a string')
    )

    after(() => database.disconnect())
})