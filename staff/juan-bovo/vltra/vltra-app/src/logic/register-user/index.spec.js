import registerUser from '.'

const { random } = Math
const { database, models: { User } } = require('vltra-data')
const bcrypt = require('bcryptjs')

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register user', () => {
    let name, surname, nickname, email, password

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        nickname = `nickname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const response = await registerUser(name, surname, nickname, email, password)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
        
        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        // expect(user.password).toBe(password)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
        expect(user.bookmarks).toBeDefined()
        expect(user.voted).toBeDefined()
    })

    it('should fail if the mail already exists', async () => {
        await User.create({ name, surname, nickname, email, password })
            try{
                await registerUser('name', 'surname', 'nickname', email, 'password')
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with e-mail ${email} already exists`)
                }
    })

    it('should fail if the nickname is already in use', async () => {
        await User.create({ name, surname, nickname, email, password })
            try{
                await registerUser('name', 'surname', nickname, 'email@mail.com', 'password')
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`nickname ${nickname} is already in use`)
                }
    })

    it('should fail on empty name', () =>
        expect(() => registerUser("", surname, nickname, email, password)).toThrow('name is empty or blank')
    )
    it('should fail on undefined name', () =>
        expect(() => registerUser(undefined, surname, nickname, email, password)).toThrow('name with value undefined is not a string')
    )
    it('should fail on wrong name type', () =>
        expect(() => registerUser(123, surname, nickname, email, password)).toThrow('name with value 123 is not a string')
    )

    it('should fail on empty surname', () =>
        expect(() => registerUser(name, "", nickname, email, password)).toThrow('surname is empty or blank')
    )
    it('should fail on undefined surname', () =>
        expect(() => registerUser(name, undefined, nickname, email, password)).toThrow('surname with value undefined is not a string')
    )
    it('should fail on wrong surname type', () =>
        expect(() => registerUser(name, 123, nickname, email, password)).toThrow('surname with value 123 is not a string')
    )

    it('should fail on empty nickname', () =>
        expect(() => registerUser(name, surname, "", email, password)).toThrow('nickname is empty or blank')
    )
    it('should fail on undefined nickname', () =>
    expect(() => registerUser(name, surname, undefined, email, password)).toThrow('nickname with value undefined is not a string')
    )
    it('should fail on wrong nickname type', () =>
        expect(() => registerUser(name, surname, 123, email, password)).toThrow('nickname with value 123 is not a string')
    )
    
    it('should fail on empty email', () =>
        expect(() => registerUser(name, surname, nickname, "", password)).toThrow('email is empty or blank')
    )
    it('should fail on undefined email', () =>
    expect(() => registerUser(name, surname, nickname, undefined, password)).toThrow('email with value undefined is not a string')
    )
    it('should fail on wrong email type', () =>
        expect(() => registerUser(name, surname, nickname, 123, password)).toThrow('email with value 123 is not a string')
    )
    it('should fail on wrong email format', () =>
        expect(() => registerUser(name, surname, nickname, "123@mailcom", password)).toThrow('email with value 123@mailcom is not a valid e-mail')
    )

    it('should fail on empty password', () =>
        expect(() => registerUser(name, surname, nickname, email, "")).toThrow('password is empty or blank')
    )
    it('should fail on undefined password', () =>
    expect(() => registerUser(name, surname, nickname, email, undefined)).toThrow('password with value undefined is not a string')
    )
    it('should fail on wrong password type', () =>
        expect(() => registerUser(name, surname, nickname, email, 123)).toThrow('password with value 123 is not a string')
    )

    afterAll(() => database.disconnect())
})