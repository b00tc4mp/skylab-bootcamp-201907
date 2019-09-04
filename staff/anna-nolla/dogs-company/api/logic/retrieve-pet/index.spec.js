require('dotenv').config()

const { expect } = require('chai')
const logic = require('..')
const { database, models: { User, Pet } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve pet', () => {

    before(() => database.connect(DB_URL_TEST))

    let nameP, age, size, gender, characteristics, name, surname, email, password, id, pet, petId

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
        const pet = await logic.retrievePet(id, petId)
            expect(pet).to.exist
            expect(pet.name).to.equal(nameP)
            expect(pet.age).to.equal(age)
            expect(pet.gender).to.equal(gender)
            expect(pet.size).to.equal(size)
            expect(pet.characteristics).to.equal(characteristics)
            expect(pet._id).to.equal(petId)
            })

    it('should fail if the user does not have pets', async () => {
        const user = await User.findById(id)
            user.pets = []
            await user.save()
            try{
                const res = await logic.retrievePet(id, petId)
                    expect(res).not.to.exist
            }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`This user does not have this pet`)
            }
    })

    it('should throw an error with a wrong id', async () =>{
        try{
            await logic.retrievePet("5d5fe532b4f3f827e6fc64f8", petId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not exist.`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() => logic.retrievePet("", petId)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.retrievePet(123, petId)).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty pet id', () =>
        expect(() => logic.retrievePet(id, "")).to.throw('pet id is empty or blank')
    )

    it('should fail on wrong pet id type', () =>
        expect(() => logic.retrievePet(id, 123)).to.throw('pet id with value 123 is not a string')
    )
    
    after(() => database.disconnect())
})