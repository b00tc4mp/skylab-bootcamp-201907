const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { Dog } = models

describe.only('logic - search dogs', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let name, breed, gender, size, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude

    beforeEach(() => {

        const breedArray = ['Sussex Spaniel', 'Swedish Vallhund', 'Tibetan Mastiff']
        const sizeArray = ['small', 'medium', 'large', 'xl']

        return (async () => {

            longitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            latitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

            await Dog.deleteMany()

            for (let i = 0; i < 20; i++) {

                name = `dogname-${Math.random()}`
                breed = `${breedArray[Math.floor(Math.random() * breedArray.length)]}`
                gender = Boolean(Math.round(Math.random()))
                size = `${sizeArray[Math.floor(Math.random() * sizeArray.length)]}`
                age = Math.floor(Math.random() * 4)
                notes = `notes-${Math.random()}`
                neutered = Boolean(Math.round(Math.random()))
                withDogs = Boolean(Math.round(Math.random()))
                withCats = Boolean(Math.round(Math.random()))
                withChildren = Boolean(Math.round(Math.random()))
                chip = `chip - ${Math.random()}`
                distance = Number((Math.floor(Math.random() * 1000)))
                await Dog.create({ name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, distance })
            }
        })()

    })

    it('should returns dogs on a correct search', async () => {

        // const searchParams = { distance, breed, gender, size, location: { coordinates: [0, 0] } }
        const searchParams = { breed, gender, location: { coordinates: [0, 0] }, distance }
        const filteredDogs = await Dog.find({ gender, distance })

        const result = await logic.searchDogs(searchParams)
        debugger
        expect(result).to.exist
        expect(result.length).to.equal(filteredDogs.length)
        expect(result[0].breed).to.equal(breed)
        expect(result[0].gender).to.equal(gender)
        expect(result[0].size).to.equal(size)
        expect(result[0]._id).not.to.exist
        expect(result[0].id).to.exist
    })

    // it('should fail on an empty query', async () => {
    //     const searchParams = {}
    //     try {
    //         await logic.searchDogs(searchParams)
    //     } catch ({ message }) {
    //         expect(message).to.equal('Input is empty')
    //     }
    // })

    // it('should fail on invalid query type', async () => {
    //     const searchParams = { breed, gender, size, location: { coordinates } }
    //     try {
    //         await logic.searchDogs(searchParams)
    //     } catch ({ message }) {
    //         expect(message).to.equal('Input 123 is not an Object')
    //     }
    // })

    after(() => database.disconnect())
})