const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Dog } = models

describe('logic - retrieve favorites', () => {

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
        years = Math.round(Math.random() * 20)
        months = Math.round(Math.random() * 12)
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
        password = `password-${Math.random()} `
        userLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
        userLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

        return (async () => {

            await User.deleteMany()
            await Dog.deleteMany()

            const dogOne = await Dog.create({ name, breed, gender, size, age: { years, months }, notes, neutered, withDogs, withCats, withChildren, chip, location: { coordinates: [longitude, latitude] } })

            const dogTwo = await Dog.create({ name: name2, breed: breed2, gender: gender2, size: size2, age: { years, months }, notes: notes2, neutered: neutered2, withDogs: withDogs2, withCats: withCats2, withChildren: withChildren2, chip: chip2, location: { coordinates: [longitude2, latitude2] } })

            dogIdOne = dogOne.id
            dogIdTwo = dogTwo.id

            const user = await User.create({ name: userName, surname, email, password, location: { coordinates: [userLongitude, userLatitude] } })

            userId = user.id

            user.favorites.push(dogIdOne, dogIdTwo)

            await user.save()

        })()

    })

    it('should retrieve a users favorite dogs', async () => {

        const result = await logic.retrieveFavorites(userId, email, password)
        expect(result).to.exist
        expect(result[0].id).to.equal(dogIdOne.toString())
        expect(result[1].id).to.equal(dogIdTwo.toString())
    })

    after(() => database.disconnect())

})

