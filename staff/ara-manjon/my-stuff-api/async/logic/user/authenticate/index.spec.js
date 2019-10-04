const { expect } = require('chai')
const logic = require('../../')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - authenticate user', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user= await User.create({ name, surname, email, password })
        id = user.id 
    })

    it('should succeed on correct data', async () =>{
        const _id = await logic.user.authenticate(email, password)
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
           
        })
     it('should fail on wrong email', async () => {
        try{
            await logic.user.authenticate('Jhon@email.com', password)
        }catch({message}){

            expect(message).to.equal(`user with e-mail Jhon@email.com does not exist`)
        }
    }) 
  it('should fail on wrong password', async () =>{
        try{
            await logic.user.authenticate(email, 'dajhfkasf')            
        }catch({message}){
        expect(message).to.equal('wrong credentials')
    }
 }) 
    after(() => mongoose.disconnect())
})

