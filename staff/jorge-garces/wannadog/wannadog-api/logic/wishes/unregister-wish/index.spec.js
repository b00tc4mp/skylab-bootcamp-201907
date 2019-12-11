const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { Wish, User } = models

describe('logic - unregister wish', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let breed, gender, size, age, neutered, withDogs, withCats, withChildren, distance
    let userName, surname, email, password, userLongitude, userLatitude, id, wishId

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

            let wishList = []

            for (let i = 0; i < 3; i++) {

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

                const wish = await Wish.create({ breed, gender, size, dogAge, neutered, withDogs, withCats, withChildren, distance })

                wishList.push(wish)


            }

            wishList.forEach(wish => user.wishes.push(wish))
            wishId = user.wishes[Math.floor(Math.random() * 3)].id
            await user.save()
        })()
    })

    it('should remove an existing wish on correct data', async () => {
        await logic.unregisterWish(id, wishId)
        const user = await User.findById(id)
        expect(user.wishes.indexOf(wishId)).to.equal(-1)
    })

    after(() => database.disconnect())
})
