require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - register cache', () => {
    
    before(async () => 
        await database.connect(DB_URL_TEST)
        .then(() => User.deleteMany())
        .then(() => Cache.deleteMany())
    )

    let username, email, password, avatar, name, description, lng, lat, location, randomTerr, hints, repeatLocation, randomDiff
    
    beforeEach(async () => {

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}@domain.com`
        avatar = `path-${Math.random()}`

        name = `name-${Math.random()}`
        description = `description-${Math.random()}`
        lng = Math.floor(Math.random() * 90)
        lat = Math.floor(Math.random() * 90)
        location = { type: 'Point', coordinates: [lng, lat] } 
        difficulty = [1,2,3]
        terrain = [1,2,3]
        randomDiff = difficulty[Math.floor(Math.random()*difficulty.length)]
        randomTerr = terrain[Math.floor(Math.random()*terrain.length)]
        hints = `hints-${Math.random()}`

        const user = await User.create({ username, password, email, avatar })
        id = user.id
    })

    it('should succeed on correct data', async () => {

        const result = await logic.registerCache(id, name, description, location, randomDiff, randomTerr, hints)
        const [user, cache] = await Promise.all([User.findById(id), Cache.findById(result)])

        expect(user).to.exist
        expect(cache.id).to.exist
        expect(cache.name).to.equal(name)
        expect(cache.description).to.equal(description)
        expect(cache.location.coordinates).to.deep.equal(location.coordinates)
        expect(cache.location.type).to.equal(location.type)
        expect(cache.difficulty).to.equal(randomDiff)
        expect(cache.terrain).to.equal(randomTerr)
        expect(cache.hints).to.equal(hints)

    })

    it('should fail on a cache that already exists', async () => {

        try {
            await logic.registerCache(id, name, description, location, randomDiff, randomTerr, hints)
        }
        catch (error) {
            expect(error.message).to.equal(`cache with name ${name} already exists`)
        }

    })

    it('should fail on a cache that that exists on same location', async () => {
        name = `name-${Math.random()}`
        repeatLocation = location
        try {
            await logic.registerCache(id, name, description, repeatLocation, randomDiff, randomTerr, hints)
        }
        catch (error) {
            expect(error.message).to.equal(`there is already a cache on ${location.coordinates}`)
        }

    })

    it('should fail on unexisting user', async () => {
        id = '123456789012'
    
        try {
            await logic.registerCache(id, name, description, location, randomDiff, randomTerr, hints)
        }
        catch (error) {
            expect(error.message).to.equal(`user with id ${id} does not exist`)
        }
    })

    it('should fail on no location coordinatesr', () => {
        location = { coordinates: [0, 0]}

        expect(() => logic.registerCache(id, name, description, location, randomDiff, randomTerr, hints)).to.throw('cache coordinates not found')
    })

    it('should fail on empty user id', () =>
        expect(() => logic.registerCache('', name, description, location, randomDiff, randomTerr, hints)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.registerCache(123, name, description, location, randomDiff, randomTerr, hints)).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty name', () =>
        expect(() => logic.registerCache(id, '', description, location, randomDiff, randomTerr, hints)).to.throw('name is empty or blank')
    )

    it('should fail on wrong name type', () =>
        expect(() => logic.registerCache(id, 12345, description, location, randomDiff, randomTerr, hints)).to.throw('name with value 12345 is not a string')
    )

    it('should fail on empty description', () =>
        expect(() => logic.registerCache(id, name, '', location, randomDiff, randomTerr, hints)).to.throw('description is empty or blank')
    )

    it('should fail on wrong description type', () =>
        expect(() => logic.registerCache(id, name, 12345, location, randomDiff, randomTerr, hints)).to.throw('description with value 12345 is not a string')
    )

    it('should fail on wrong empty hints', () =>
        expect(() => logic.registerCache(id, name, description, location, randomDiff, randomTerr, '')).to.throw('hints is empty or blank')
    )
    it('should fail on wrong empty type', () =>
        expect(() => logic.registerCache(id, name, description, location, randomDiff, randomTerr, 12345)).to.throw('hints with value 12345 is not a string')
    )
    after(() => database.disconnect())
})