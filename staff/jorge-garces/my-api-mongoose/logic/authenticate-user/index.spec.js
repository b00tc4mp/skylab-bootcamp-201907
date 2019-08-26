const mongoose = require('mongoose')
const {expect} = require('chai')
const logic = require('..')
const { User } = require('../../models')

describe('logic', ()=>{

    before(()=>{
        mongoose.connect('mongodb://localhost/my-api-mongoose', {useNewUrlParser: true})
    })

    describe('authentication user', ()=> {
        let name, surname, email, password

        beforeEach(()=>{
        
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()}`
            
            return User.deleteMany()
             .then(()=> User.create({name, surname, email, password}))
                .then(user =>  id = user.id)
            
        })
        
        it ('should authenticate on correct data', ()=> 
            logic.authenticateUser(email, password)
            .then(result => {
                expect(result).to.exist
                expect(result).to.be.a('string')
                expect(result).to.equal(id)
            })
        )

        it('should fail on incorrect data', ()=>{
            let password = "fail"
            logic.authenticateUser(email, password)
            .catch(error => {
                expect(error).to.exist
            })
        })

             it('should fail on empty username', () => {
                expect(() =>
                    logic.authenticateUser('', password)
                ).to.throw(Error, 'email is empty or blank')
            })

            it('should fail on emtpy password', () => {
                expect(()=> 
                    logic.authenticateUser(email, '')
                ).to.throw(Error, 'password is empty or blank')
            })

            it('should fail on non-valid username', () => {
                expect(()=> 
                    logic.authenticateUser('asdf#adsf.com', password)
                ).to.throw(Error, 'email with value asdf#adsf.com is not a valid e-mail')
            })

            it('should fail on non-string username', () => {
                expect(()=> 
                    logic.authenticateUser(undefined, password)
                ).to.throw(Error, 'email with value undefined is not a string')
            })

            it('should fail on non-string password', () => {
                expect(()=> 
                    logic.authenticateUser(email, undefined)
                ).to.throw(Error, 'password with value undefined is not a string')
            })
 
        

    })
   after(()=>mongoose.disconnect())

})