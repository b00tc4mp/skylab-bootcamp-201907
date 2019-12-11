import logic from '..'
import { database, models } from 'footcamp-data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        await User.deleteMany()

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })

        id = user.id
    })

    it('should succeed on correct data', async () => {
        
        const result = await logic.authenticateUser(email, password)

        expect(result).toBeUndefined()

        const { __token__ } = logic

        expect(typeof __token__).toBe('string')
        expect(__token__.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(__token__, REACT_APP_JWT_SECRET_TEST)

        expect(sub).toBe(id)

    })
    it('should fail on incorrect data', async ()=>{
        let password = "fake-mail"

        try {
            await logic.authenticateUser(email, password)
        } catch(error) {
            expect(error).toBeDefined()
        }
    })

        it('should fail on empty email', () => {
            expect(() =>
                logic.authenticateUser('', password)
            ).to.throw(Error, 'email is empty or blank')
        })

        it('should fail on emtpy password', () => {
            expect(()=> 
                logic.authenticateUser(email, '')
            ).to.throw(Error, 'password is empty or blank')
        })

        it('should fail on non-valid email', () => {
            expect(()=> 
                logic.authenticateUser('asdf#adsf.com', password)
            ).to.throw(Error, 'email with value asdf#adsf.com is not a valid e-mail')
        })

        it('should fail on non-string email', () => {
            expect(()=> 
                logic.authenticateUser(undefined, password)
            ).to.throw(Error, 'email with value undefined is not a string')
        })

        it('should fail on non-string password', () => {
            expect(()=> 
                logic.authenticateUser(email, undefined)
            ).to.throw(Error, 'password with value undefined is not a string')
        })

    afterAll(() => database.disconnect())
})