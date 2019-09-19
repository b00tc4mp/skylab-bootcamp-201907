require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('.')
const { database, models: { User } } = require('menu-planner-data')
const bcrypt = require('bcryptjs') 


const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {
    
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10)})
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await authenticateUser(email, password)
    
            expect(_id).to.exist
            expect(_id).to.be.a('string')
            expect(_id).to.equal(id)  
    })
    
    it('should fail on empty email', () => 
        expect(() => 
            authenticateUser('', password)
        ).to.throw('email is empty or blank')
    )

    it('should fail on undefined email', () => 
        expect(() => 
            authenticateUser(undefined, password)
        ).to.throw(`email with value undefined is not a string`)
    )

    it('should fail on wrong data type', () => 
        expect(() => 
            authenticateUser(123, password)
        ).to.throw(`email with value 123 is not a string`)
    )

    after(() => database.disconnect())
})