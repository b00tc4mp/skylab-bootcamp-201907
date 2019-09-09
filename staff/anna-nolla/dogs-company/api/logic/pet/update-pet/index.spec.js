require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Pet } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - update pet', () => {

    before(() => database.connect(DB_URL_TEST))

    let nameP, age, gender, size, characteristics, name, surname, email, password, id, petId,
    ageM, characteristicsM, sizeM, genderM, nameM

    beforeEach( async () => {

        age = new Date
        nameP =  `name-${Math.random()}`
        characteristics = `characteristics-${Math.random}`
        size = `size-${Math.random()}`
        gender = Math.random() >= 0.5

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        ageM = new Date
        nameM =  `namePet-${Math.random()}`
        characteristicsM = `characteristicsaaadaw-${Math.random()}`
        sizeM = `sizeD-${Math.random()}`
        genderM = Math.random() >= 0.5

        await Pet.deleteMany()
        await User.deleteMany()
            const pet = await new Pet({ name: nameP, age, gender, size, characteristics })
            debugger
            const user = await User.create({ name, surname, email, password, pets: pet })
                petId = user.pets[0]._id.toString()
                id = user.id
    })

    it('should succeed on correct data', async () =>{
        const pet_Id = await logic.updatePet(id, petId, { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM } )
            expect(pet_Id).not.to.exist
            debugger
            const user = await User.findOne({ "pets._id": petId })
                expect(user.pets[0]).to.exist
                expect(user.pets[0].id).to.equal(petId)
                expect(user.pets[0].name).to.equal(nameM)
                expect(user.pets[0].age).to.deep.equal(ageM)
                expect(user.pets[0].gender).to.equal(genderM)
                expect(user.pets[0].size).to.equal(sizeM)
                expect(user.pets[0].characteristics).to.equal(characteristicsM)
    })

    it('should fail if the pet does not exist', async () => {
        const user = await User.findById(id)
            await user.save(petId)
        try{
            await logic.updatePet(id, '5d5d5530531d455f75da9fF9', { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('This user has no pet with this id')
        }
    })

    it('should fail on unexisting user', () =>
        logic.updatePet('5d5d5530531d455f75da9fF9', petId, { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })
            .catch(({ message }) => expect(message).to.equal(`User does not exists.`))
    )

    it('should fail on empty user id', () =>
        expect(() => logic.updatePet("", petId, { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.updatePet(123, petId, { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty pet id', () =>
        expect(() => logic.updatePet(id, "",  { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })).to.throw('pet id is empty or blank')
    )

    it('should fail on wrong pet id type', () =>
        expect(() => logic.updatePet(id, 123,  { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })).to.throw('pet id with value 123 is not a string')
    )
    
    it('should fail on empty name', () =>
        expect(() => logic.updatePet(id, petId, { 'name': "", 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })).to.throw('name is empty or blank')
    )

    it('should fail on wrong name type', () =>
        expect(() => logic.updatePet(id, petId, { 'name': 123, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })).to.throw('name with value 123 is not a string')
    )

    it('should fail on wrong date ', () =>
        expect(() => logic.updatePet(id, petId, { 'name': nameM, 'age': 'bla', 'gender': genderM, 'size': sizeM, 'characteristics': characteristicsM })).to.throw('age with value bla is not a date')
    )

    it('should fail on wrong gender type', () =>
        expect(() => logic.updatePet(id, petId, { 'name': nameM, 'age': ageM, 'gender': "gender", 'size': sizeM, 'characteristics': characteristicsM })).to.throw('gender with value gender is not a boolean')
    )

    it('should fail on empty size', () =>
        expect(() => logic.updatePet(id, petId,  { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': '', 'characteristics': characteristicsM })).to.throw('size is empty or blank')
    )

    it('should fail on wrong size type', () =>
        expect(() => logic.updatePet(id, petId,  { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': 123, 'characteristics': characteristicsM })).to.throw('size with value 123 is not a string')
    )

    it('should fail on empty characteristics', () =>
    expect(() => logic.updatePet(id, petId,  { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': '' })).to.throw('characteristics is empty or blank')
    )

    it('should fail on wrong characteristics type', () =>
        expect(() => logic.updatePet(id, petId,  { 'name': nameM, 'age': ageM, 'gender': genderM, 'size': sizeM, 'characteristics': 123 })).to.throw('characteristics with value 123 is not a string')
    )

    after(() => database.disconnect())
})