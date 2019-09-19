require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Notification } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - delete notification', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, notificationId


    beforeEach( async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        title = `name-${Math.random()}`
        text = `text-${Math.random()}`

        await Notification.deleteMany()
        await User.deleteMany()
            const notification = await new Notification({ title, text })
                notificationId = notification.id
            const user = await User.create({ name, surname, email, password, notification })
                id = user.id
    })      
    
    it('should succeed on correct data', async () =>{
        const notification = await logic.deleteNotification(id, notificationId)
            expect(notification).not.to.exist
    })
    
    it('should fail if the user pet does not exist', async () => {
        notificationId = "0.9343650890953465"
        try {
            const res = await logic.deleteNotification(id, notificationId)
                expect(res).not.to.exist
        }catch (error){
                expect(error).to.exist
                expect(error.message).to.equal('This pet is not from this owner')
        }
    })

    it("should fail on unexisting user" , async () => {
        try{
            await logic.deleteNotification('5d5d5530531d455f75da9fF9' , notificationId)
        }catch ({ message }) {
            expect(message).to.equal('There is no user with this id')
        }
    })

    it('should fail on empty user id', () => 
        expect(() => logic.deleteNotification("" , notificationId)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.deleteNotification(123 , notificationId)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty notification id', () => 
        expect(() => logic.deleteNotification(id , "")).to.throw('notification id is empty or blank')
    )
    
    it('should fail on wrong notification id type', () => 
        expect(() => logic.deleteNotification(id , 123)).to.throw('notification id with value 123 is not a string')
    )
    after(() => database.disconnect())
})