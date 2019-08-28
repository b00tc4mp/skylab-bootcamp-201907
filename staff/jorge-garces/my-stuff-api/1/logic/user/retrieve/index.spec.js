const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User } = require('../../../models')

describe('logic', ()=>{

    before(()=>{
        mongoose.connect('mongodb://172.17.0.2/my-stuff-api', {useNewUrlParser: true})
    })

  
    describe('retrieve user', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            
            return (async () => {
                await User.deleteMany()
                const user = await User.create({name, surname, email, password})
                id = user.id
            })()
        })

        it('should succeed on correct data', async () => {
            const user = await logic.user.retrieve(id)
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).not.to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).not.to.exist
            })
        
        it('should fail on empty id', () => {
            expect(() =>
                logic.user.retrieve('')
            ).to.throw(Error, 'id is empty or blank')
        })

        it('should fail on emtpy password', () => {
            expect(()=> 
                logic.user.retrieve(undefined)
            ).to.throw(Error, 'id with value undefined is not a string')
        })

        it('should fail on non-valid email', () => {
            expect(()=> 
                logic.user.retrieve(123)
            ).to.throw(Error, 'id with value 123 is not a string')
        })
    })

    after(()=>mongoose.disconnect())

})