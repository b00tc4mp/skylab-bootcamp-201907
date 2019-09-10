const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Dog } = models

describe('logic - retrieve all dogs', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let name, name2, breed, breed2, gender, gender2, size, size2, years, months, notes, notes2, neutered, neutered2, withDogs, withDogs2, withCats, withCats2, withChildren, withChildren2, chip, chip2, longitude, longitude2, latitude, latitude2

    let userId, userName, surname, email, password, userLongitude, userLatitude, dogIdOne, dogIdTwo


    beforeEach(() => {

        const breedArray = ['Sussex Spaniel', 'Swedish Vallhund', 'Tibetan Mastiff']
        const sizeArray = ['small', 'medium', 'large', 'xl']

        name = `dogname-${Math.random()}`
        breed = `${breedArray[Math.floor(Math.random() * breedArray.length)]}`
        gender = Boolean(Math.round(Math.random()))
        size = `${sizeArray[Math.floor(Math.random() * sizeArray.length)]}`
        years = Math.round(Math.random() * 20)
        months = Math.round(Math.random() * 12)
        notes = `notes-${Math.random()}`
        neutered = Boolean(Math.round(Math.random()))
        withDogs = Boolean(Math.round(Math.random()))
        withCats = Boolean(Math.round(Math.random()))
        withChildren = Boolean(Math.round(Math.random()))
        chip = `chip - ${Math.random()}`
        longitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
        latitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

        name2 = `dogname-${Math.random()}`
        breed2 = `${breedArray[Math.floor(Math.random() * breedArray.length)]}`
        gender2 = Boolean(Math.round(Math.random()))
        size2 = `${sizeArray[Math.floor(Math.random() * sizeArray.length)]}`
        notes2 = `notes - ${Math.random()}`
        neutered2 = Boolean(Math.round(Math.random()))
        withDogs2 = Boolean(Math.round(Math.random()))
        withCats2 = Boolean(Math.round(Math.random()))
        withChildren2 = Boolean(Math.round(Math.random()))
        chip2 = `chip-${Math.random()}`
        longitude2 = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
        latitude2 = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

        userName = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `name-${Math.random()} `
        userLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
        userLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

        return (async () => {

            await User.deleteMany()
            await Dog.deleteMany()


            const newUser = new User({ name: userName, surname, email, password })
            newUser.location.coordinates.push(userLongitude, userLatitude)
            userId = newUser.id

            const dogOne = new Dog({
                name, breed, gender, size, age: { years, months }, notes, neutered, withDogs, withCats, withChildren, chip
            })
            dogOne.location.coordinates.push(longitude, latitude)

            const dogTwo = new Dog({
                name: name2, breed: breed2, gender: gender2, size: size2, age: { years, months }, notes: notes2, neutered: neutered2, withDogs: withDogs2, withCats: withCats2, withChildren: withChildren2, chip: chip2
            })
            dogTwo.location.coordinates.push(longitude2, latitude2)

            dogIdOne = dogOne.id
            dogIdTwo = dogTwo.id

            dogOne.owner = userId
            dogTwo.owner = userId

            newUser.dogs.push(dogIdOne, dogIdTwo)

            await Promise.all([newUser.save(), dogOne.save(), dogTwo.save()])
        })()
    })

    it('should succeed on correct data', async () => {

        const dogs = await logic.retrieveAllDogs(userId)
        debugger
        expect(dogs).to.exist
        expect(dogs.length).to.equal(2)
        const dogOne = dogs.find(dog => dog.id.toString() === dogIdOne)
        const dogTwo = dogs.find(dog => dog.id.toString() === dogIdTwo)
        expect(dogOne.name).to.equal(name)
        expect(dogOne.breed).to.equal(breed)
        expect(dogOne.size).to.equal(size)
        expect(dogOne.age.years).to.equal(years)
        expect(dogOne.age.months).to.equal(months)
        expect(dogOne.notes).to.equal(notes)
        expect(dogOne.neutered).to.equal(neutered)
        expect(dogOne.withDogs).to.equal(withDogs)
        expect(dogOne.withCats).to.equal(withCats)
        expect(dogOne.withChildren).to.equal(withChildren)
        expect(dogOne.chip).to.equal(chip)
        expect(dogOne.location.coordinates[0]).to.equal(longitude)
        expect(dogOne.location.coordinates[1]).to.equal(latitude)
        expect(dogTwo.name).to.equal(name2)
        expect(dogTwo.breed).to.equal(breed2)
        expect(dogTwo.size).to.equal(size2)
        expect(dogTwo.age.years).to.equal(years)
        expect(dogTwo.age.months).to.equal(months)
        expect(dogTwo.notes).to.equal(notes2)
        expect(dogTwo.neutered).to.equal(neutered2)
        expect(dogTwo.withDogs).to.equal(withDogs2)
        expect(dogTwo.withCats).to.equal(withCats2)
        expect(dogTwo.withChildren).to.equal(withChildren2)
        expect(dogTwo.chip).to.equal(chip2)
        expect(dogTwo.location.coordinates[0]).to.equal(longitude2)
        expect(dogTwo.location.coordinates[1]).to.equal(latitude2)
    })

    it('should fail if the user does not exist', async () => {
        userId = "5d727b4c3701906e68297075"
        try {
            await logic.retrieveAllDogs(userId)
        } catch ({ message }) {
            expect(message).to.exist
            expect(message).to.equal(`user with id ${userId} not found`)
        }
    })

    after(() => database.disconnect())
})