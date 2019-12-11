const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Dog } = models

describe('logic - register dog', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude, id

    let userName, surname, email, password, userLongitude, userLatitude


    beforeEach(() => {
        const breedArray = ['Sussex Spaniel', 'Swedish Vallhund', 'Tibetan Mastiff']
        const sizeArray = ['small', 'medium', 'large', 'xl']

        name = `dogname-${Math.random()}`
        breed = `${breedArray[Math.floor(Math.random() * breedArray.length)]}`
        gender = Boolean(Math.round(Math.random()))
        size = `${sizeArray[Math.floor(Math.random() * sizeArray.length)]}`
        age = Math.round(Math.random() * 4)
        notes = `notes-${Math.random()}`
        neutered = Boolean(Math.round(Math.random()))
        withDogs = Boolean(Math.round(Math.random()))
        withCats = Boolean(Math.round(Math.random()))
        withChildren = Boolean(Math.round(Math.random()))
        chip = `chip - ${Math.random()}`
        longitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
        latitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

        return (async () => {


            userName = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()} `
            userLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            userLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)
            const user = await User.create({ name: userName, surname, email, password, location: { coordinates: [userLongitude, userLatitude] } })
            id = user.id

        })()
    })

    it('should succeed on correct data', async () => {

        const dog = await logic.registerDog(id, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        expect(dog).to.exist
        const dogFound = await Dog.findOne({ chip })
        expect(dogFound).to.exist
        expect(dogFound.id).to.equal(dog)
        expect(dogFound.breed).to.equal(breed)
        expect(dogFound.gender).to.equal(gender)
        expect(dogFound.size).to.equal(size)
        expect(dogFound.age).to.equal(age)
        expect(dogFound.neutered).to.equal(neutered)
        expect(dogFound.withDogs).to.equal(withDogs)
        expect(dogFound.withCats).to.equal(withCats)
        expect(dogFound.withChildren).to.equal(withChildren)
        expect(dogFound.chip).to.equal(chip)
    })

    it('should fail if the dog already exists', async () => {
        try {
            await Dog.create({ name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude })

            await logic.registerDog(id, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        }
        catch ({ message }) {
            expect(message).to.exist
            expect(message).to.equal(`Dog with chip ${chip} already exists`)
        }
    })


    /* Name */
    it('should fail on empty name', () =>
        expect(() =>
            logic.registerDog(undefined, '', breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('name is empty or blank')
    )

    it('should fail on undefined name', () =>
        expect(() =>
            logic.registerDog(undefined, undefined, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('name with value undefined is not a string')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, 123, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw(`name with value 123 is not a string`)
    )

    /* Breed */
    it('should fail on empty breed', () =>
        expect(() =>
            logic.registerDog(undefined, name, '', gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('breed is empty or blank')
    )

    it('should fail on undefined breed', () =>
        expect(() =>
            logic.registerDog(undefined, name, undefined, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('breed with value undefined is not a string')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, 123, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw(`breed with value 123 is not a string`)
    )

    /*Gender*/
    it('should fail on empty gender', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, '', size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('gender is empty or blank')
    )

    it('should fail on undefined gender', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, undefined, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('gender with value undefined is not a boolean')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, 123, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw(`gender with value 123 is not a boolean`)
    )
    /*Size*/
    it('should fail on empty size', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, '', age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('size is empty or blank')
    )

    it('should fail on undefined size', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, undefined, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('size with value undefined is not a string')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, 123, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw(`size with value 123 is not a string`)
    )

    /*notes*/

    it('should fail on undefined notes', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, undefined, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('notes with value undefined is not a string')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, 123, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw(`notes with value 123 is not a string`)
    )

    /* Neutered */
    it('should fail on empty neutered', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, '', withDogs, withCats, withChildren, chip, longitude, latitude)).to.throw('neutered is empty or blank')
    )

    it('should fail on undefined neutered', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, undefined, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('neutered with value undefined is not a boolean')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, 123, withDogs, withCats, withChildren, chip, longitude, latitude)
        ).to.throw(`neutered with value 123 is not a boolean`)
    )
    /* With Dogs */
    it('should fail on empty withDogs', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, '', withCats, withChildren, chip, longitude, latitude)).to.throw('withDogs is empty or blank')
    )

    it('should fail on undefined withDogs', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, undefined, withCats, withChildren, chip, longitude, latitude)
        ).to.throw('withDogs with value undefined is not a boolean')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, 123, withCats, withChildren, chip, longitude, latitude)
        ).to.throw(`withDogs with value 123 is not a boolean`)
    )
    /* With Cats */
    it('should fail on empty withCats', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, '', withChildren, chip, longitude, latitude)).to.throw('withCats is empty or blank')
    )

    it('should fail on undefined withCats', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, undefined, withChildren, chip, longitude, latitude)
        ).to.throw('withCats with value undefined is not a boolean')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, 123, withChildren, chip, longitude, latitude)
        ).to.throw(`withCats with value 123 is not a boolean`)
    )
    /* With Children */
    it('should fail on empty withChildren', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, '', chip, longitude, latitude)).to.throw('withChildren is empty or blank')
    )

    it('should fail on undefined withChildren', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, undefined, chip, longitude, latitude)
        ).to.throw('withChildren with value undefined is not a boolean')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, 123, chip, longitude, latitude)
        ).to.throw(`withChildren with value 123 is not a boolean`)
    )
    /* chip */
    it('should fail on empty chip', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withCats, '', longitude, latitude)).to.throw('chip is empty or blank')
    )

    it('should fail on undefined chip', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withCats, undefined, longitude, latitude)
        ).to.throw('chip with value undefined is not a string')
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withCats, 123, longitude, latitude)
        ).to.throw(`chip with value 123 is not a string`)
    )


    // TODO => COORDINATES VALIDATION

    // /* Longitude */
    // it('should fail on undefined longitude', () =>
    //     expect(() =>
    //         logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withCats, chip, undefined, latitude)
    //     ).to.throw('Longitude with value undefined is not a Number')
    // )

    // it('should fail on wrong longitude type', () =>
    //     expect(() =>
    //         logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withCats, chip, 'hola', latitude)
    //     ).to.throw(`Longitude with value hola is not a Number`)
    // )

    // /* Latitude */
    // it('should fail on undefined Latitude', () =>
    //     expect(() =>
    //         logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withCats, chip, undefined, latitude)
    //     ).to.throw('Latitude with value undefined is not a Number')
    // )

    // it('should fail on wrong Latitude type', () =>
    //     expect(() =>
    //         logic.registerDog(undefined, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withCats, chip, 'hola', latitude)
    //     ).to.throw(`Latitude with value hola is not a Number`)
    // )

    after(() => database.disconnect())
})