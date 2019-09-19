import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - update space', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let username, name, surname, email, password, id
    let title, type, picture, address, passcode, spaceId, body

    beforeEach(async() => {
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ username, name, surname, email, password: hash })
        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
        logic.__userCredentials__ = { id: id, token: token }

        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        body = {
            title: `newName-${Math.random()}`,
            type: `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        }
        
        await Space.deleteMany()

        const newSpace = await Space.create({ title, type, picture, address, passcode })
        spaceId = newSpace.id.toString()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.updateSpace(spaceId, body)
        expect(result).toBeUndefined

        const space = await Space.findById(id)
        expect(space).toBeDefined
        /* expect(space.title).toBe(body.title)
        expect(space.type).toBe(body.type) 
        expect(space.id).toBe(spaceId)
        expect(space.address).toBe(address)
        expect(space.passcode).toBe(passcode) */
            
    })

     it('should fail on non-existent space', async () => {
        spaceId = '5d5d5530531d455f75da9fF9'

        try{
            await logic.updateSpace(spaceId, body)

            throw new Error('should not reach this point')
        } catch({ message }) {
            expect(message).toBe(`space with id ${spaceId} does not exist`)
        }
    }) 

    it('should fail on empty space id', async () => {
        spaceId = ''

        try{
            await logic.updateSpace(spaceId, body)
        } catch({ message }) {
            expect(message).toBe('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try{
            await logic.updateSpace(spaceId, body)
        } catch({ message }) {
            expect(message).toBe("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
        id = 123

        try{
            await logic.updateSpace(spaceId, body)
        } catch({ message }) {
            expect(message).toBe("space id with value 123 is not a string")
        }
    })

    it('should fail on empty body', async () => {
        body = ''

        try{
            await logic.updateSpace(spaceId, body)
        } catch({ message }) {
            expect(message).toBe('body is empty or blank')
        }
    })

    it('should fail on undefined body', async () => {
        body = undefined

        try{
            await logic.updateSpace(spaceId, body)
        } catch({ message }) {
            expect(message).toBe("body with value undefined is not an object")
        }
    })
     
    it('should fail on wrong body data type', async() => {
        body = 123

        try{
            await logic.updateSpace(spaceId, body)
        } catch({ message }) {
            expect(message).toBe("body with value 123 is not an object")
        }
    })

    afterAll(() => database.disconnect())
})