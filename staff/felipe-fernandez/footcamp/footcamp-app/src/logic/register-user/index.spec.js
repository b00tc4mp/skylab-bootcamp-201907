import logic from '..'

const { random } = Math

const { database, models: { User } } = require('footcamp-data')
import bcrypt from 'bcryptjs'


// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

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
        // expect(user.password).toBe(password)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
    })


    /* Name */
    it('should fail on empty name', () => 
        expect(() => 
               logic.registerUser('', surname, email, password)
    ).to.throw('name is empty or blank')
    )

     it('should fail on undefined name', () => 
        expect(() => 
               logic.registerUser(undefined, surname, email, password)
    ).to.throw(`name with value undefined is not a string`)
    )

     it('should fail on wrong data type for name', () => 
        expect(() => 
               logic.registerUser(123, surname, email, password)
    ).to.throw(`name with value 123 is not a string`)
    )

    /* Surname */
    it('should fail on empty surname', () => 
        expect(() => 
               logic.registerUser(name, '', email, password)
    ).to.throw('surname is empty or blank')
    )

     it('should fail on undefined surname', () => 
        expect(() => 
               logic.registerUser(name, undefined, email, password)
    ).to.throw(`surname with value undefined is not a string`)
    )

     it('should fail on wrong data type for surname', () => 
        expect(() => 
               logic.registerUser(name, 123, email, password)
    ).to.throw(`surname with value 123 is not a string`)
    )


    /* Email */
    it('should fail on empty email', () => 
        expect(() => 
               logic.registerUser(name, surname, '', password)
    ).to.throw('email is empty or blank')
    )

     it('should fail on undefined surname', () => 
        expect(() => 
               logic.registerUser(name, surname, undefined, password)
    ).to.throw(`email with value undefined is not a string`)
    )

     it('should fail on wrong data type for email', () => 
        expect(() => 
               logic.registerUser(name, surname, 123, password)
    ).to.throw(`email with value 123 is not a string`)
    )

     it('should fail on wrong email format', () => 
        expect(() => 
               logic.registerUser(name, surname, 'a@a', password)
    ).to.throw(`email with value a@a is not a valid e-mail`)
    )

    /* Password */
    it('should fail on empty password', () => 
        expect(() => 
               logic.registerUser(name, surname, email, '')
    ).to.throw('password is empty or blank')
    )

     it('should fail on undefined password', () => 
        expect(() => 
               logic.registerUser(name, surname, email, undefined)
    ).to.throw(`password with value undefined is not a string`)
    )

     it('should fail on wrong data type for password', () => 
        expect(() => 
               logic.registerUser(name, surname, email, 123)
    ).to.throw(`password with value 123 is not a string`)
    )

    afterAll(() => database.disconnect())
})