require('dotenv').config()

const { expect } = require('chai')
const logic = require('..')
const { database, models: { User, Pet } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve pets', () => {

    before(() => database.connect(DB_URL_TEST))

    let nameP, age, characteristics, name, surname, email, password, id, pet

    beforeEach( async () => {

        age = Number(Math.random())
        nameP =  `name-${Math.random()}`
        characteristics = `characteristics-${Math.random}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            pet = await new Pet({ name: nameP, age, characteristics })
            const user = await User.create({ name, surname, email, password, pets: pet })
            id = user.id
    })      
    
    it('should succeed on correct data', async () =>{ 
        const pet = await logic.retrieveAllPets(id)
            expect(pet).to.exist
            expect(pet[0].name).to.equal(nameP)
            expect(pet[0].age).to.equal(age)
            expect(pet[0].characteristics).to.equal(characteristics)
            })

    it('should fail if the user does not have pets', async () => {
        const user = await User.findById(id)
            user.pets = []
            await user.save()
            try{
                const res = await logic.retrieveAllPets(id)
                    expect(res).not.to.exist
            }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`This user does not have pets`)
            }
    })

    it('should throw an error with a wrong id', async () =>{
        try{
            await logic.retrieveAllPets("5d5fe532b4f3f827e6fc64f8")
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not exist.`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() => logic.retrieveAllPets("")).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.retrieveAllPets(123)).to.throw('user id with value 123 is not a string')
    )

    after(() => database.disconnect())
})