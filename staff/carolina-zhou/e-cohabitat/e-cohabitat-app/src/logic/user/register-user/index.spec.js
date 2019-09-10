import registerUser from '.'
/* const { User } = require('data') */

const { random } = Math

describe('logic - register user', () => {
    
    let username, name, surname, email, password

    beforeEach(() => {
        username = `username-${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    /* it('should succeed on correct data', async () => {
        const response = await registerUser(username, name, surname, email, password)
        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
        expect(user).toBeDefined()
        expect(user.username).toBe(username)
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.password).toBe(password)
    })

    it('should fail if the e-mail is already registered', async () => {
        await User.create({ username, name, surname, email, password })

        try {
            await registerUser(username, name, surname, email, password)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`user with e-mail ${email} already exists`)
        }
    }) */

    // username
    it('should fail on empty username', async () => {
        username = ''

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('username is empty or blank')
        }
    })

    it('should fail on undefined username', async () => {
        username = undefined

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('username with value undefined is not a string')
        }
    })

    it('should fail on wrong username data type', async () => {
        username = 123

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('username with value 123 is not a string')
        }
    })

    // name
    it('should fail on empty name', async () => {
        name = ''

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('name is empty or blank')
        }
    })

    it('should fail on undefined name', async () => {
        name = undefined

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('name with value undefined is not a string')
        }
    })

    it('should fail on wrong name data type', async () => {
        name = 123

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('name with value 123 is not a string')
        }
    })

    // surname
    it('should fail on empty surname', async () => {
        surname = ''

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('surname is empty or blank')
        }
    })

    it('should fail on undefined surname', async () => {
        surname = undefined

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('surname with value undefined is not a string')
        }
    })

    it('should fail on wrong surname data type', async () => {
        surname = 123

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('surname with value 123 is not a string')
        }
    })

    // email
    it('should fail on empty email', async () => {
        email = ''

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('e-mail is empty or blank')
        }
    })

    it('should fail on undefined email', async () => {
        email = undefined

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('e-mail with value undefined is not a string')
        }
    })

    it('should fail on wrong email data type', async () => {
        email = 123

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('e-mail with value 123 is not a string')
        }
    })

    // password
    it('should fail on empty password', async () => {
        password = ''

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('password is empty or blank')
        }
    })

    it('should fail on undefined password', async () => {
        password = undefined

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('password with value undefined is not a string')
        }
    })

    it('should fail on wrong password data type', async () => {
        password = 123

        try {
            await registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).toBe('password with value 123 is not a string')
        }
    })
})