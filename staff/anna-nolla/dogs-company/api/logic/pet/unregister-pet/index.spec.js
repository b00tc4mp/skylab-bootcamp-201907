require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Pet } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister card', () => {

    before(() => database.connect(DB_URL_TEST))

    let nameP, age, gender, size, characteristics, name, surname, email, password, id, pet, petId

    beforeEach( async () => {

        age = Number(Math.random())
        nameP =  `name-${Math.random()}`
        characteristics = `characteristics-${Math.random}`
        size = `size-${Math.random()}`
        gender = Math.random() >= 0.5

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            pet = await new Pet({ name: nameP, age, gender, size, characteristics })
            const user = await User.create({ name, surname, email, password, pets: pet })
                petId = user.pets[0]._id.toString()
                id = user.id
    })      
    
    it('should succeed on correct data', async () =>{
        const pet = await logic.unregisterPet(id, petId)
            expect(pet).not.to.exist
    })
    
    it('should fail if the user pet does not exist', async () => {
        petId = "0.9343650890953465"
        try {
            const res = await logic.unregisterPet(id, petId)
                expect(res).not.to.exist
        }catch (error){
                expect(error).to.exist
                expect(error.message).to.equal(`This pet does not exist`)
        }
    })

    it("should fail on unexisting user" , async () => {
        try{
            await logic.unregisterPet('5d5d5530531d455f75da9fF9' , petId)
        }catch ({ message }) {
            expect(message).to.equal('There is no user with this id')
        }
    })

    it('should fail on empty user id', () => 
        expect(() => logic.unregisterPet("" , petId)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterPet(123 , petId)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty pet id', () => 
        expect(() => logic.unregisterPet(id , "")).to.throw('pet id is empty or blank')
    )
    
    it('should fail on wrong pet id type', () => 
        expect(() => logic.unregisterPet(id , 123)).to.throw('pet id with value 123 is not a string')
    )
    after(() => database.disconnect())
})