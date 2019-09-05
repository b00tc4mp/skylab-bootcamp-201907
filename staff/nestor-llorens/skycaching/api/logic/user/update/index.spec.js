const { expect } = require('chai')
const logic = require('../.')
const { User } = require('../../../../data')
const mongoose = require('mongoose')

describe('logic - update user', () => {

    let name, surname, email, password, body

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    body = {
        name: `name-${Math.random()}`,
        surname: `surname-${Math.random()}`,
        email: `email-${Math.random()}@domain.com`,
        password: `password-${Math.random()}`,
    }

    before(async () => {
        await mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true })
            .then(() => User.deleteMany())
        
        mongoose.set('useFindAndModify', false)

        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async() => {
        const result = await logic.updateUser(id, body)
        expect(result).not.to.exist
        const user = await User.findById(id)
        expect(user).to.exist
        expect(user.name).to.equal(body.name)
        expect(user.surname).to.equal(body.surname)
        expect(user.email).to.equal(body.email)
        expect(user.password).to.equal(body.password)
        
    })
            

    it('should fail on non-existing user', async() => {
    
        try {
            await logic.updateUser('123456789012', body)
        } catch(error) {
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }
    })

    after(() => mongoose.disconnect())
})