const { expect } = require('chai')
const logic = require('..')
const { Subject, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register subject', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let nameS, surnameS, emailS, passwordS, nameT, surnameT, emailT, passwordT, nameSubject

    beforeEach(async () => {

        nameS = `Aname-${Math.random()}`
        surnameS = `Asurname-${Math.random()}`
        emailS = `Aemail-${Math.random()}@domain.com`
        passwordS = `Apassword-${Math.random()}`
        typeS = `student`
        nameT = `Tname-${Math.random()}`
        surnameT = `Tsurname-${Math.random()}`
        emailT = `Temail-${Math.random()}@domain.com`
        passwordT = `Tpassword-${Math.random()}`
        typeT = `teacher`
        nameSubject = `name-${Math.random()}`
       
        await User.deleteMany()

    })

    it('should succeed on correct data', async () => {
        
        await logic.registerUser(name, surname, email, password, card)

        const user =  await User.findOne({email})

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)

    })

    it('error because e-mail already exist', async() => {
        await User.create({name, surname, email, password, card})
        
        try{

            await logic.registerUser(name, surname, email, password, card)

        }catch(error){
            
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)
        }

        await User.deleteMany()
    })

    after(() => mongoose.disconnect())
})