const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Dog } = models

describe('logic', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    describe('toggle favorite', () => {

        let name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude, dogId

        let userName, surname, email, password, userLongitude, userLatitude, id


        beforeEach(async () => {

            await User.deleteMany()
            await Dog.deleteMany()

            const breedArray = ['Sussex Spaniel', 'Swedish Vallhund', 'Tibetan Mastiff']
            const sizeArray = ['small', 'medium', 'large', 'xl']

            name = `dogname-${Math.random()}`
            breed = `${breedArray[Math.floor(Math.random() * breedArray.length)]}`
            gender = Boolean(Math.round(Math.random()))
            size = `${sizeArray[Math.floor(Math.random() * sizeArray.length)]}`
            age = '2019/01'
            notes = `notes-${Math.random()}`
            neutered = Boolean(Math.round(Math.random()))
            withDogs = Boolean(Math.round(Math.random()))
            withCats = Boolean(Math.round(Math.random()))
            withChildren = Boolean(Math.round(Math.random()))
            chip = `chip - ${Math.random()}`
            longitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            latitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

            const doggie = await Dog.create({ name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, location: { coordinates: [longitude, latitude] } })

            dogId = doggie.id

            userName = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `pass-${Math.random()} `
            userLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            userLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

            const user = await User.create({ name: userName, surname, email, password, location: { coordinates: [userLongitude, userLatitude] } })

            id = user.id
        })

        it('should add a dog to favorites if it doesnt exist', async () => {
            await logic.toggleFavDog(id, dogId)
            const user = await User.findById(id)
            expect(user.favorites[0]).to.exist
            expect(user.favorites[0].toString()).to.equal(dogId)
        })

        it('should remove a dog from favorites if it already exists', async () => {
            let user = await User.findById(id)
            user.favorites.push(dogId)
            await user.save()
            await logic.toggleFavDog(id, dogId)
            user = await User.findById(id)
            expect(user.favorites[0]).not.to.exist
        })

        it('should fail if user doesnt exist', async () => {
            id = '5d72a1fb8d10954e050e3a4c'
            try {
                await logic.toggleFavDog(id, dogId)
            } catch ({ message }) {

                expect(message).to.equal(`User with id ${id} not found`)
            }
        })

        it('should fail if dog doesnt exist', async () => {
            dogId = '5d72a1fb8d10954e050e3a4c'
            try {
                await logic.toggleFavDog(id, dogId)
            } catch ({ message }) {

                expect(message).to.equal(`Dog with id ${dogId} not found`)
            }
        })

        after(() => database.disconnect())
    })
})