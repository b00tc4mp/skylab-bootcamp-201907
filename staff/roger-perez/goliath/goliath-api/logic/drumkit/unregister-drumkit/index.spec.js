const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User,  Drumkit } = require('../../../data')

describe('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let name , surname ,instrument,  email , password ,userId , drumkitId

    beforeEach( async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        instrument = `instrument-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()

        const user = await User.create({ name , surname ,instrument , email , password })
        userId = user.id
        const drumkit = await new Drumkit({ userId , name, sequences,creator })
        drumkitId = drumkit.id
        user.drumkitss.push(drumkit)

        await user.save()
        // return user.save() => it also works... why?
    })

    it("should succeed on correct data" , async () =>{
        const result = await logic.unregisterDrumkit(userId , drumkitId)
        expect(result).not.to.exist
    })

    it("should fail on unexisting user" , async () => {
        try{
            await logic.unregisterDrumkit('5d5d5530531d455f75da9fF9' , drumkitId)
        } catch({ message }){
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it("should fail on unexisting card" , async () => {
        try{
            await logic.unregisterDrumkit(userId , '5d5d5530531d455f75da9fF9')
        } catch({ message }){
            expect(message).to.equal(' drumkit with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    // user id
    it('should fail on empty user id', () => 
        expect(() => logic.unregisterDrumkit("" , drumkitId)).to.throw('user id is empty or blank')
    )

    it('should fail on undefined user id', () => 
        expect(() => logic.unregisterDrumkit(undefined , drumkitId)).to.throw('user id with value undefined is not a string')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterDrumkit(123 , drumkitId)).to.throw('user id with value 123 is not a string')
    )
    
    //  drumkit id
    it('should fail on empty  drumkit id', () => 
        expect(() => logic.unregisterDrumkit(userId , "")).to.throw(' drumkit id is empty or blank')
    )

    it('should fail on undefined  drumkit id', () => 
        expect(() => logic.unregisterDrumkit(userId , undefined)).to.throw(' drumkit id with value undefined is not a string')
    )
    
    it('should fail on wrong  drumkit id type', () => 
        expect(() => logic.unregisterDrumkit(userId , 123)).to.throw(' drumkit id with value 123 is not a string')
    )
    after(() => mongoose.disconnect())
})