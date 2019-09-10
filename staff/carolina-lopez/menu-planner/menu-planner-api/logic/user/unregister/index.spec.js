require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('menu-planner-data')
const bcrypt = require('bcryptjs') 


const { env: { DB_URL_TEST }} = process

describe('logic - unregister user', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()

        const user = await User.create({ name, surname, email, password : await bcrypt.hash(password, 10)})
        id = user.id
    })

    it('should succeed on correct data', async () => {

        const result = await unregisterUser(id, password)
            
            expect(result).not.to.exist

            const user = await User.findById(id)
            
            expect(user).not.to.exist   
    })

    it('should fail on unexisting user', async () => {
        try{
            await unregisterUser('5d5d5530531d455f75da9fF9', password)

        } catch({ message }) {
            expect(message).to.equal('wrong credentials1')
        }
    }
    )

    it('should fail on existing user, but wrong password', async () => {
        try{
            await unregisterUser(id, 'wrongpassword')

        } catch({ message }) {
            expect(message).to.equal('wrong credentials2')
        }
    })

    it('should fail on wrong data type', () => 
        expect(() => 
            unregisterUser(123, password)
        ).to.throw(`id with value 123 is not a string`)
    )

    after(() => database.disconnect())
})