const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Dog } = models

describe('logic - retrieve vehicle', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude, id, dogId

    let userName, surname, email, password, userLongitude, userLatitude


    beforeEach(() => {
        const breedArray = ['Sussex Spaniel', 'Swedish Vallhund', 'Tibetan Mastiff']
        const sizeArray = ['small', 'medium', 'large', 'xl']

        name = `dogname-${Math.random()}`
        breed = `${breedArray[Math.floor(Math.random() * breedArray.length)]}`
        gender = Boolean(Math.round(Math.random()))
        size = `${sizeArray[Math.floor(Math.random() * sizeArray.length)]}`
        age = Math.floor(Math.random() * 4)
        notes = `notes - ${Math.random()}`
        neutered = Boolean(Math.round(Math.random()))
        withDogs = Boolean(Math.round(Math.random()))
        withCats = Boolean(Math.round(Math.random()))
        withChildren = Boolean(Math.round(Math.random()))
        chip = `chip - ${Math.random()}`
        longitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
        latitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

        return (async () => {
            await Dog.deleteMany()

            userName = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()} `
            userLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            userLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)
            const user = new User({ name: userName, surname, email, password })
            user.location.coordinates.push(userLongitude, userLatitude)
            id = user.id
            await user.save()

            const dogAge = new Date(age)
            const dog = new Dog({
                name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude
            })
            dog.location.coordinates.push(longitude, latitude)
            dogId = dog.id
            dog.owner = id

            await dog.save()
        })()
    })

    it('should succeed on correct data', async () => {

        const doggie = await logic.retrieveDog(dogId)

        expect(doggie).to.exist
        expect(doggie.owner.toString()).to.equal(id)
        expect(doggie).to.exist
        expect(doggie.id).to.equal(dogId)
        expect(doggie.breed).to.equal(breed)
        expect(doggie.gender).to.equal(gender)
        expect(doggie.size).to.equal(size)
        expect(doggie.age).to.deep.equal(age)
        expect(doggie.neutered).to.equal(neutered)
        expect(doggie.withDogs).to.equal(withDogs)
        expect(doggie.withCats).to.equal(withCats)
        expect(doggie.withChildren).to.equal(withChildren)
        expect(doggie.chip).to.equal(chip)
    })


    // it('should fail if the vehicle already exists', async () => {

    //     try {
    //         const newVehicle = new Vehicle({ make, model, year, type, color, electric, plate })
    //         newVehicle.owner = _userId
    //         await newVehicle.save()
    //         await logic.retrieveDog(vehicleId)
    //     }
    //     catch ({ message }) {
    //         expect(message).to.exist
    //         expect(message).to.equal(`Vehicle already exists.`)
    //     }
    // })

    // /* Make */
    // it('should fail on empty id', () =>
    //     expect(() =>
    //         logic.retrieveDog('')
    //     ).to.throw('Vehicle ID is empty or blank')
    // )

    // it('should fail on undefined id', () =>
    //     expect(() =>
    //         logic.vehicle.retrieve(undefined)
    //     ).to.throw(`Vehicle ID with value undefined is not a string`)
    // )

    // it('should fail on wrong data type for id', () =>
    //     expect(() =>
    //         logic.vehicle.retrieve(123)
    //     ).to.throw(`Vehicle ID with value 123 is not a string`)
    // )

    after(() => database.disconnect())
})