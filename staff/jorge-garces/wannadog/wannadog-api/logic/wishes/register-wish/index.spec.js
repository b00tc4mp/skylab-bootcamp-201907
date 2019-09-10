const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { Wish, User } = models

describe('logic - register wish', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let breed, gender, size, age, neutered, withDogs, withCats, withChildren, distance
    let userName, surname, email, password, userLongitude, userLatitude, id

    beforeEach(() => {

        const breedArray = ['Sussex Spaniel', 'Swedish Vallhund', 'Tibetan Mastiff']
        const sizeArray = ['small', 'medium', 'large', 'xl']

        return (async () => {

            await Wish.deleteMany()
            await User.deleteMany()

            userName = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()} `
            userLongitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
            userLatitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

            const user = await User.create({ name: userName, surname, email, password, location: { coordinates: [userLongitude, userLatitude] } })
            id = user.id

            breed = `${breedArray[Math.floor(Math.random() * breedArray.length)]}`
            gender = Boolean(Math.round(Math.random()))
            size = `${sizeArray[Math.floor(Math.random() * sizeArray.length)]}`
            age = '2019/01'
            const dogAge = new Date(age)
            neutered = Boolean(Math.round(Math.random()))
            withDogs = Boolean(Math.round(Math.random()))
            withCats = Boolean(Math.round(Math.random()))
            withChildren = Boolean(Math.round(Math.random()))
            distance = Number((Math.floor(Math.random() * 1000)))
        })()
    })

    it('should save a well constructed wish', async () => {

        const wishParams = { breed, gender, size, withDogs, withCats, distance }
        const wish = await logic.registerWish(id, wishParams) //return wishId.toString()

        const user = await User.findById(id)

        expect(user).to.exist
        expect(user.wishes[0].id.toString()).to.equal(wish)
    })

    after(() => database.disconnect())
})