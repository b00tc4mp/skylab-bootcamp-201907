require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister space co-user', () => {

    before(() => database.connect(DB_URL_TEST))

    let title, type, picture, address, passcode
    let username, name, surname, email, password
    let username2, name2, surname2, email2, password2
    let username3, name3, surname3, email3, password3
    let spaceId, coUserIdOne, coUserIdTwo

    beforeEach(async() => {
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        await Space.deleteMany()
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        username2 = `username2-${Math.random()}`
        name2 = `name2-${Math.random()}`
        surname2 = `surname2-${Math.random()}`
        email2 = `email2-${Math.random()}@email.com`
        password2 = `1232-${Math.random()}`

        const newUserOne = await User.create({ username, name, surname, email, password })
        coUserIdOne = newUserOne.id

        const newUserTwo = await User.create({ username: username2, name: name2, surname: surname2, email: email2, password :password2 })
        coUserIdTwo = newUserTwo.id

        const newSpace = await Space.create({ title, type, picture, address, passcode })
        newSpace.cousers.push(coUserIdOne, coUserIdTwo)
        spaceId = newSpace.id
        await newSpace.save()
    })

    it('should succeed on correct data', async () => {
        const user = await User.findById(coUserIdOne)
        expect(user).to.exist
        expect(user.id).to.equal(coUserIdOne)

        const space = await Space.findById(spaceId)
        expect(space).to.exist
        expect(space.id).to.equal(spaceId)
        expect(space.cousers).to.include(coUserIdOne)
        
        const result = await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
        expect(result).to.exist
        expect(result.cousers).not.to.include(coUserIdOne) 
    })

    it('should fail on unexistent property', async () => {
        spaceId = "5d5d5530531d455f75db9fF9"

        try {
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong space id provided')
        }
    })

    it('should fail on existent property but wrong co-user', async () => {
        username3 = `username3-${Math.random()}`
        name3 = `name3-${Math.random()}`
        surname3 = `surname3-${Math.random()}`
        email3 = `email3-${Math.random()}@email.com`
        password3 = `1233-${Math.random()}`

        const newUserThree = await User.create({ username: username3, name: name3, surname: surname3, email: email3, password :password3 })
        coUserIdThree = newUserThree.id

        try {
            await logic.unregisterSpaceCouser(spaceId, coUserIdThree)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal(`user with id ${coUserIdThree} is not a co-user`)
        }
    })

    it('should fail on unexistent co-user', async () => {
        coUserIdOne = '5d5d5530531d455f75da9fF9'
        try {
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong co-user id provided')
        }
    })

    it('should fail on empty space id', async () => {
        spaceId = ' '

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
        } catch({ message }) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
        } catch({ message }) {
            expect(message).to.equal("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
        spaceId = 123

         try{
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
        } catch({ message }) {
            expect(message).to.equal("space id with value 123 is not a string")
        }
    })

    it('should fail on empty co-user id', async () => {
        coUserIdOne = ' '

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
        } catch({ message }) {
            expect(message).to.equal('co-user id is empty or blank')
        }
    })

    it('should fail on undefined co-user id', async () => {
        coUserIdOne = undefined

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
        } catch({ message }) {
            expect(message).to.equal("co-user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong co-user id data type', async() => {
        coUserIdOne = 123

         try{
            await logic.unregisterSpaceCouser(spaceId, coUserIdOne)
        } catch({ message }) {
                expect(message).to.equal("co-user id with value 123 is not a string")
        }
    })

    after(() => database.disconnect())
})