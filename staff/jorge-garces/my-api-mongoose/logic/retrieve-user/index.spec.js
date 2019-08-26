const mongoose = require('mongoose')
const {expect} = require('chai')
const logic = require('..')
const { User } = require('../../models')

describe('logic', ()=>{

    before(()=>{
        mongoose.connect('mongodb://localhost/my-api-mongoose', {useNewUrlParser: true})
    })

  
    describe('retrieve user', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            
            return User.deleteMany()
            .then(()=> User.create({name, surname, email, password}))
               .then(user =>  id = user.id)
        })

        it('should succeed on correct data', () =>
            logic.retrieveUser(id)
                .then(user => {
                    expect(user).to.exist
                    expect(user.id).to.equal(id)
                    expect(user._id).not.to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).not.to.exist
                })
        )
    })

 after(()=>mongoose.disconnect())

})