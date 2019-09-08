require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Notification } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve notification', () => {

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
        const notification = await logic.retrieveNotification(id)
            expect(notification).to.exist   
            expect(notification.title).to.equal(title)
            expect(notification.text).to.equal(text)
            expect(notification.id).to.equal(notificationId)
    })

    it('should fail if the user does not have notifications', async () => {
        const user = await User.findById(id)
            user.notification = []
            await user.save()
            try{
                const res = await logic.retrieveNotification(id)
                    expect(res).not.to.exist
            }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`This user does not have notifications`)
            }
    })

    it('should throw an error with a wrong id', async () =>{
        try{
            await logic.retrieveNotification("5d5fe532b4f3f827e6fc64f8")
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not exist.`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() => logic.retrieveNotification("")).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.retrieveNotification(123)).to.throw('user id with value 123 is not a string')
    )

    after(() => database.disconnect())
})