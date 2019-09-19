import logic from '..'
import { database, models } from 'menu-planner-data'
import bcrypt from 'bcryptjs'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

const { random } = Math

describe('logic - register user', () => {
    let name, surname, email, password
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const response = await logic.registerUser(name, surname, email, password)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
    
        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
    })

    // /* Name */
    it('should fail on empty name', () =>
        expect(() =>             
            logic.registerUser(' ', surname, email, password)
            ).toThrow(Error, 'name is empty or blank')
    )

    it('should fail on undefined name', () => 
        expect(() => 
               logic.registerUser(undefined, surname,email, password)
    ).toThrow(`name with value undefined is not a string`)
    )

    it('should fail on wrong data type for name', () => 
        expect(() => 
               logic.registerUser(123, surname, email,password)
    ).toThrow(`name with value 123 is not a string`)
    )

    // /* Surname */
    it('should fail on empty surname', () => 
        expect(() => 
               logic.registerUser(name, '', email,password)
    ).toThrow('surname is empty or blank')
    )

    it('should fail on undefined surname', () => 
        expect(() => 
               logic.registerUser(name, undefined, email,password)
    ).toThrow(`surname with value undefined is not a string`)
    )

    it('should fail on wrong data type for surname', ()=> 
        expect(() => 
               logic.registerUser(name, 123, email, password)
    ).toThrow(`surname with value 123 is not a string`)
    )

    // /* Email */
    it('should fail on empty email', () => 
        expect(() => 
               logic.registerUser(name, surname, '',password)
    ).toThrow('email is empty or blank')
    )

     it('should fail on undefined surname', () => 
        expect(() => 
               logic.registerUser(name, surname,undefined, password)
    ).toThrow(`email with value undefined is not a string`)
    )

    it('should fail on wrong data type for email', () => 
        expect(() => 
               logic.registerUser(name, surname, 123,password)
    ).toThrow(`email with value 123 is not a string`)
    )

    it('should fail on wrong email format', () => 
        expect(() => 
               logic.registerUser(name, surname, 'a@a', password)
    ).toThrow(`email with value a@a is not a valid e-mail`)
    )

    // /* Password */
    it('should fail on empty password', () => 
        expect(() => 
               logic.registerUser(name, surname, email, '')
    ).toThrow('password is empty or blank')
    )

    it('should fail on undefined password', () => 
        expect(() => 
               logic.registerUser(name, surname, email, undefined)
    ).toThrow(`password with value undefined is not a string`)
    )

    it('should fail on wrong data type for password', ()=> 
        expect(() => 
               logic.registerUser(name, surname, email, 123)
    ).toThrow(`password with value 123 is not a string`)
    )

    afterAll(() => database.disconnect())
})