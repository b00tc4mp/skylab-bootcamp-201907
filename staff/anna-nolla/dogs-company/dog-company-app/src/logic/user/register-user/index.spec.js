import registerUser from '.'
import data from 'data'
const { database, models: { User } } = data

debugger
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST


describe('logic - register user', () => {
    debugger
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    let name, surname, email, password, repassword
    
    beforeEach(async () => {
debugger
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        repassword = password

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {

        const response = await registerUser(name, surname, email, password, repassword)
            expect(response).toBeDefined()
            expect(response.message).toBe("User registered successfully")
            
            const user = await User.findOne({ email })
                expect(user).toBeDefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBe(password)

    })
            
    it('should fail on non-matching re-password', () =>
        expect(() => registerUser(name, surname, email, password, 'repassword')
            ).toThrowError(Error, 'Passwords do not match')
    )
    
    it('should fail on empty name', () =>
        expect(() => registerUser('', surname, email, password, repassword)
            ).toThrowError(Error, 'name is empty or blank')
    )
    it('should fail on non-valid name', () =>
        expect(() => registerUser(123, surname, email, password, repassword)
            ).toThrowError(Error, 'name with value 123 is not a valid name')
    )

    it('should fail on empty surname', () =>
        expect(() => registerUser(name, '', email, password, repassword)
            ).toThrowError(Error, 'surname is empty or blank')
    )
    it('should fail on non-valid surname', () =>
        expect(() => registerUser(name, 123, email, password, repassword)
            ).toThrowError(Error, 'surname with value 123 is not a valid surname')
    )

    it('should fail on empty email', () =>
        expect(() => registerUser(name, surname, '', password, repassword)
            ).toThrowError(Error, 'email is empty or blank')
    )

    it('should fail on non-valid email', () =>
        expect(() => registerUser(name, surname, 'anna$mail.com', password, repassword)
            ).toThrowError(Error, 'email with value manuelbarzi#gmail.com is not a valid e-mail')
    )
    it('should fail on empty password', () =>
        expect(() => registerUser(name, surname, email, '', repassword)
            ).toThrowError(Error, 'password is empty or blank')
    )

    it('should fail on non-valid password', () =>
    expect(() => registerUser(name, surname, email, 123, repassword)
        ).toThrowError(Error, 'password with value 123 is not a valid password')
    )

    it('should fail on empty repassword', () =>
        expect(() => registerUser(name, surname, email, password, '')
            ).toThrowError(Error, 'repassword is empty or blank')
    )

    it('should fail on non-valid password', () =>
        expect(() => registerUser(name, surname, email, password, 123)
            ).toThrowError(Error, 'repassword with value 123 is not a valid repassword')
    )

    afterAll(() => database.disconnect())
})