const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User, Dog } = models

describe('logic', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    describe('dog deletion', () => {

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

            const user = await User.create({ name: userName, surname, email, password, location: { coordinates: [userLongitude, userLatitude] }, dogs: [dogId] })

            id = user.id

            doggie.owner = user.id
            await doggie.save()

        })
        it('should delete a dog on correct data', async () => {
            const result = await logic.unregisterDog(id, email, password, dogId)
            expect(result).not.to.exist
            const dogFind = await Dog.findById(dogId)
            expect(dogFind).not.to.exist

        })
        it('should fail on unexisting dog', async () => {
            dogId = '5d5d5530531d455f75da9fF9'
            try {
                await logic.unregisterDog(id, email, password, dogId)
                throw Error('should not reach this point')
            }
            catch ({ message }) {
                expect(message).to.equal('There was an error unregistering the dog')
            }
        })


        it('should fail on wrong password', async () => {
            password = 'wrongpassword'
            try {
                await logic.unregisterDog(id, email, password, dogId)
                throw Error('should not reach this point')
            }
            catch ({ message }) {
                expect(message).to.equal('There was an error unregistering the dog')
            }
        })
        after(() => database.disconnect())
    })
})