require('dotenv').config()

const {expect} = require('chai')
const logic = require('../../../logic')
const { database, models: { User } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
   })

    it('should succeed on correct data', async () => {
        const result = await logic.registerUser(name, surname, email, password)
            expect(result).not.to.exist
        const user = await User.findOne({ email, password })
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal(password)
        })

    it('should fail if the user already exists', async () => {

       await User.create({ name, surname, email, password })

       try {
            await logic.registerUser(name, surname, email, password)
       } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User already exists.`)
       }
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

    after(() => database.disconnect())
})