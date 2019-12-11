require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('menu-planner-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {

    before(() =>  database.connect(DB_URL_TEST))
        
    let name, surname, email, password

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result = await registerUser(name, surname, email, password, password)
            
        expect(result).not.to.exist
        const user = await User.findOne({ email })
    
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.exist
    })

    it('should fail on empty name', () => 
        expect(() => 
               registerUser('', surname, email, password, password)
    ).to.throw('name is empty or blank')
    )

     it('should fail on undefined name', () => 
        expect(() => 
            registerUser(undefined , surname, email, password, password)
        ).to.throw(`name with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
            registerUser(123, surname, email, password, password)
        ).to.throw(`name with value 123 is not a string`)
    )

    it('should fail on empty surname', () => 
        expect(() => 
           registerUser(name, '', email, password, password)
        ).to.throw('surname is empty or blank')
    )

    it('should fail on undefined surname', () => 
        expect(() => 
            registerUser(name, undefined, email, password, password)
        ).to.throw(`surname with value undefined is not a string`)
    )

    it('should fail on wrong data type', () => 
        expect(() => 
            registerUser(name, 123, email, password, password)
        ).to.throw(`surname with value 123 is not a string`)
    )

    it('should fail on empty email', () => 
        expect(() => 
            registerUser(name, surname, '', password, password)
        ).to.throw('username is empty or blank')
    )

    it('should fail on undefined email', () => 
        expect(() => 
            registerUser(name, surname, undefined, password, password)
        ).to.throw(`username with value undefined is not a string`)
    )

    it('should fail on wrong data type', () => 
        expect(() => 
            registerUser(name, surname, 123, password, password)
        ).to.throw(`username with value 123 is not a string`)
    )

    after(() => database.disconnect())
})