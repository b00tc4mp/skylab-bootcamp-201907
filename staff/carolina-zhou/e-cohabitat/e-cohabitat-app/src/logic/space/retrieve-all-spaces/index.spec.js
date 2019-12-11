import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - retrieve all spaces', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
    let id, username, name, surname, email, password

    beforeEach(async() => {
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
    })

    it('should succeed on correct data', async() => {
        const spaces = await logic.retrieveAllSpaces(id)
        expect(spaces).toBeDefined()
    })

    afterAll(() => database.disconnect())
})