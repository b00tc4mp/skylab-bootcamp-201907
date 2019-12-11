import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - register co-user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let title, type, picture, address, passcode, spaceId
    let username, name, surname, email, password, spaces, coUserId
    let username2, name2, surname2, email2, password2, existentUserId

    beforeEach(async () => {
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
        email = `email1-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        username2 = `username-${Math.random()}`
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email2-${Math.random()}@email.com`
        password2 = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password: await bcrypt.hash(password, 10), spaces })
        coUserId = user.id

        const space = await Space.create({ title, type, picture, address, passcode, cousers: [existentUserId] })
        spaceId = space.id

        const existentUser = await User.create({ username: username2, name: name2, surname: surname2, email: email2, password: await bcrypt.hash(password2, 10), spaces: [spaceId] })
        existentUserId = existentUser.id
        
        const token = jwt.sign({ sub: existentUserId }, REACT_APP_JWT_SECRET_TEST)
        logic.__userCredentials__ = { id: existentUserId, token: token }
        
    })


    it('should succeed on correct data', async () => {
        const space = await logic.registerSpaceCouser(email, passcode, spaceId)

        expect(space).toBeDefined
        /* expect(space.id).toBeDefined
        expect(space.title).toBe(title)
        expect(space.type).toBe(type)
        expect(space.picture).toBe(picture)
        expect(space.address).toBe(address)
        expect(space.passcode).toBe(passcode)
        expect(space.cousers).toHaveLength(2) */
    })


    it('should fail if the co-user is already registered', async () => {
        try {
            await logic.registerSpaceCouser(email2, passcode, spaceId)
        } catch({error}) {
            expect(error).toBeDefined
            expect(error.message).toBe(`user already registered in space with id ${spaceId}`)
        }
    })

    // email
    it('should fail on empty email', async () => {
        email = ''

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('co-user email is empty or blank')
        }
    })

    it('should fail on undefined email', async () => {
        email = undefined

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('co-user email with value undefined is not a string')
        }
    })

    it('should fail on wrong email data type', async () => {
        email = 123

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('co-user email with value 123 is not a string')
        }
    })

    // passcode
    it('should fail on empty passcode', async () => {
        passcode = ''

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('space passcode is empty or blank')
        }
    })

    it('should fail on undefined passcode', async () => {
        passcode = undefined

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('space passcode with value undefined is not a string')
        }
    })

    it('should fail on wrong passcode data type', async () => {
        passcode = 123

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('space passcode with value 123 is not a string')
        }
    })

    // spaceId
    it('should fail on empty spaceId', async () => {
        spaceId = ''

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('space id is empty or blank')
        }
    })

    it('should fail on undefined spaceId', async () => {
        spaceId = undefined

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('space id with value undefined is not a string')
        }
    })

    it('should fail on wrong user spaceId type', async () => {
        spaceId = 123

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)
        } catch({message}) {
            expect(message).toBe('space id with value 123 is not a string')
        }
    })

    afterAll(() => database.disconnect())
})
