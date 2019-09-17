import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - register space', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let title, type, picture, address, passcode
    let username, name, surname, email, password, id

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

        const user = await User.create({ username, name, surname, email, password: await bcrypt.hash(password, 10) })
        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
        logic.__userCredentials__ = { id: id, token: token }
    })

    it('should succeed on correct data', async () => {
        const response = await logic.registerSpace(title, type, picture, address, passcode)
        expect(response).toBeUndefined()

        const space = await Space.findOne({ passcode })
        expect(space).toBeDefined()
        expect(space.id).toBeDefined()
        expect(space.title).toBe(title)
        expect(space.type).toBe(type)
        expect(space.address).toBe(address)
        expect(space.passcode).toBe(passcode)
        expect(space.cousers).toHaveLength(1)
    })

    /* it('should fail if the space already exists', async () => {
        await Space.create({ title, type, picture, address, passcode })

        try { 
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({error}) {
            expect(error).toBeDefined
            expect(error.message).toBe(`space already exists`)
        }
    }) */

    // name
    it('should fail on empty space name', async () => {
        title = ''

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space name is empty or blank')
        }
    })

    it('should fail on undefined space name', async () => {
        title = undefined

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space name with value undefined is not a string')
        }
    })

    it('should fail on wrong space name data type', async () => {
        title = 123

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space name with value 123 is not a string')
        }
    })

    // type
    it('should fail on empty space type', async () => {
        type = ''

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space type is empty or blank')
        }
    })

    it('should fail on undefined space type', async () => {
        type = undefined

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space type with value undefined is not a string')
        }
    })

    it('should fail on wrong space type data type', async () => {
        type = 123

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space type with value 123 is not a string')
        }
    })

    // picture
    it('should fail on empty picture', async () => {
        picture = ''

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('picture is empty or blank')
        }
    })

    it('should fail on undefined picture', async () => {
        picture = undefined

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('picture with value undefined is not a string')
        }
    })

    it('should fail on wrong picture data type', async () => {
        picture = 123

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('picture with value 123 is not a string')
        }
    })

    // address
    it('should fail on empty space address', async () => {
        address = ''

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space address is empty or blank')
        }
    })

    it('should fail on undefined space address', async () => {
        address = undefined

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space address with value undefined is not a string')
        }
    })

    it('should fail on wrong space address data type', async () => {
        address = 123

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space address with value 123 is not a string')
        }
    })

    // passcode
    it('should fail on empty space passcode', async () => {
        passcode = ''

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space passcode is empty or blank')
        }
    })

    it('should fail on undefined space passcode', async () => {
        passcode = undefined

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space passcode with value undefined is not a string')
        }
    })

    it('should fail on wrong space passcode data type', async () => {
        passcode = 123

        try {
            await logic.registerSpace(title, type, picture, address, passcode)
        } catch({message}) {
            expect(message).toBe('space passcode with value 123 is not a string')
        }
    })

    afterAll(() => database.disconnect())
})