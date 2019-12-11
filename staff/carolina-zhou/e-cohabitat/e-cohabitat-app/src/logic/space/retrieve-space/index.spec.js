import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - retrieve space', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let title, type, picture, address, passcode, id, spaceId, username, name, surname, email, password

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

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ username, name, surname, email, password: hash })
        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
        logic.__userCredentials__ = { id: id, token: token }

        const space = await Space.create({ title, type, picture, address, passcode })
        spaceId = space.id
    })

    it('should succeed on correct data', async () => {
        const space = await logic.retrieveSpace(spaceId)
        expect(space).toBeDefined()
        expect(space.id).toBe(spaceId)
        expect(space.title).toBe(title)
        expect(space.type).toBe(type)
        expect(space.picture).toBe(picture)
        expect(space.address).toBe(address)
        expect(space.passcode).toBe(passcode)
    })

    it('should fail on empty space id', async () => {
        try{
            await logic.retrieveSpace(' ')
        } catch({ message }) {
            expect(message).toBe('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
          try{
            await logic.retrieveSpace(undefined)
        } catch({ message }) {
            expect(message).toBe("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
         try{
            await logic.retrieveSpace(123)
        } catch({ message }) {
                expect(message).toBe("space id with value 123 is not a string")
        }
    })

    afterAll(() => database.disconnect())
})