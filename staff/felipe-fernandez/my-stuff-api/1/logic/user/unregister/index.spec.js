const { expect } = require('chai')
const logic = require('../../../logic')
const {User} = require('../../../models')
const mongoose = require('mongoose')

describe.only('logic - unregister user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-stuff-api', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.user.unregister(id, email, password)
        expect(result).not.to.exist
        const userFind = await User.findById(id)
        expect(userFind).not.to.exist
           
        })

    it('should fail on unexisting user', async () => {
        try {
            const user = await logic.user.unregister('5d5d5530531d455f75da9fF9', email, password)
            if (user) throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal('There was an error unregistering the user')
        }
        
    })

    it('should fail on existing user, but wrong password', async () => {
        try {
            const user = await logic.user.unregister(id, email, 'wrong-password')
            if (user) throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal('There was an error unregistering the user')
        }
        
    })
    it('should fail on existing user, but wrong password', async () => {
        try {
            const user = await logic.user.unregister(id, email, password)
            if (user) throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal('There was an error unregistering the user')
        }
        
    })


    after(() => mongoose.disconnect())
})