require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Pet } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - register pet', () => {

    before(() => database.connect(DB_URL_TEST))

    let age, nameP, size, gender, characteristics, name, surname, email, password, id

    beforeEach( async () => {

        age = new Date
        nameP = `name-${Math.random()}`
        characteristics = `characteristics-${Math.random()}`
        size = `size-${Math.random()}`
        gender = Math.random() >= 0.5

        await Pet.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`

            await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                id = user.id
    })

    it('should succeed on correct data', async () =>{
        const petId = await logic.registerPet(id, nameP, age, gender, size, characteristics)
            expect(petId).to.exist
            const user = await User.findOne({ "pets._id": petId })
                expect(user).to.exist
                expect(user.pets[0].name).to.equal(nameP)
                expect(user.pets[0].age).to.deep.equal(age)
                expect(user.pets[0].gender).to.equal(gender)
                expect(user.pets[0].size).to.equal(size)
                expect(user.pets[0].characteristics).to.equal(characteristics)
    })

    it('should fail if the pet already exists', async () => {
        pet = new Pet({ nameP, age, gender, size, characteristics })
        const user = await User.findById(id)
            await user.save(pet)
        try{
            await logic.registerPet(id, nameP, age, gender, size, characteristics)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Pet already exists.`)
        }
    })

    it('should fail on unexisting user', () =>
        logic.registerPet('5d5d5530531d455f75da9fF9', nameP, age,gender, size, characteristics)
            .catch(({ message }) => expect(message).to.equal(`User does not exists.`))
    )

    it('should fail on existing pet', () =>
        logic.registerPet(id, nameP, age, gender, size, characteristics)
            .then(() => logic.registerPet(id, nameP, age, gender, size, characteristics))
            .catch(({ message }) => expect(message).to.equal('Pet already exists'))
    )

    it('should fail on empty user id', () =>
        expect(() => logic.registerPet("", nameP, age, gender, size, characteristics)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.registerPet(123, nameP, age, gender, size, characteristics)).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty name', () =>
        expect(() => logic.registerPet(id, "", age, gender, size, characteristics)).to.throw('name is empty or blank')
    )

    it('should fail on wrong name type', () =>
    expect(() => logic.registerPet(id, 123, age, gender, size, characteristics)).to.throw('name with value 123 is not a string')
    )

    it('should fail on empty age', () =>
    expect(() => logic.registerPet(id, name, "123", gender, size, characteristics)).to.throw('age with value 123 is not a date')
    )
    
    it('should fail on empty characteristics', () =>
    expect(() => logic.registerPet(id, name, age, gender, size, "")).to.throw('characteristics is empty or blank')
    )

    it('should fail on wrong characteristics type', () =>
    expect(() => logic.registerPet(id, name, age, gender, size, 123)).to.throw('characteristics with value 123 is not a string')
    )

    it('should fail on empty size', () =>
    expect(() => logic.registerPet(id, name, age, gender, "", characteristics)).to.throw('size is empty or blank')
    )

    it('should fail on wrong size type', () =>
    expect(() => logic.registerPet(id, name, age, gender, 123, characteristics)).to.throw('size with value 123 is not a string')
    )
    
    it('should fail on wrong gender type', () =>
    expect(() => logic.registerPet(id, name, age, 123, size, characteristics)).to.throw('gender with value 123 is not a boolean')
    )

    after(() => database.disconnect())
})