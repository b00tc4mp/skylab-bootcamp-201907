const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

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

        const user = await logic.retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user._id).not.to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).not.to.exist

    })

    it('error because incorrect id', async() => {
        const _id = '5d66385aa9cc484ad9727cb4'
        try{

            await logic.retrieveUser(_id)
            
        }catch(error){
            
            expect(error.message).to.equal(`user with id ${_id} not found`)

        }
    })

    it('error because empty id', async() => {
        try{

            await logic.retrieveUser('')
            
        }catch(error){
            
            expect(error.message).to.equal(`id is empty`)

        }
    })

    it('error because incorrect id', async() => {
        const _id = '5d66385aa9cc484d977cb4'
        try{

            await logic.retrieveUser(_id)
            
        }catch(error){
            
            expect(error).to.exist
            expect(error.message).to.equal(`Cast to ObjectId failed for value "${_id}" at path "_id" for model "User"`)

        }
    })

    after(() => mongoose.disconnect())
})