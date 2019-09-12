require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - update cache', () => {
    before(async () => await database.connect(DB_URL_TEST)
    .then(() => User.deleteMany())
    .then(() => Cache.deleteMany()))

    let username, password, email, avatar, id, body

    beforeEach(async () => {
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        avatar = `avatar-${Math.random()}`

        body = {
            name: `name-${Math.random()}`,
            description: `description-${Math.random()}`,
            location: {type: 'Point', coordinates: [40, 80] },
            difficulty: 1,
            terrain: 1,
            hints: `hints-${Math.random()}`

        }

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

        const cache = await Cache.create({ owner: id, name, description, location, difficulty: randomDiff, terrain: randomTerr, hints})
        cacheId = cache.id
    })

    it('should succeed on correct data', async () => {
        debugger
        const result = await logic.updateCache(id, cacheId, body)
        expect(result).not.to.exist
        const cache = await Cache.findById(cacheId)
        expect(cache).to.exist
        expect(cache.name).to.equal(body.name)
        expect(cache.description).to.equal(body.description)
        expect(cache.location.coordinates[0]).to.equal(body.location.coordinates[0])
        expect(cache.location.coordinates[1]).to.equal(body.location.coordinates[1])
        expect(cache.difficulty).to.equal(body.difficulty)
        expect(cache.terrain).to.equal(body.terrain)
        expect(cache.hints).to.equal(body.hints)
    })

    it('should fail on non-existing cache', async () => {
        cacheId = '123456789012'
        debugger
        try {
            await logic.updateCache(id, cacheId, body)

        } catch ({ message }) {
            expect(message).to.equal(`cache with id ${cacheId} not found`)
        }
    })

    it('should fail on empty id', () =>
        expect(() => logic.updateCache(id, '', body)).to.throw('cache id is empty or blank')
    )

    it('should fail on wrong id type', () =>
        expect(() => logic.updateCache(id, 123, body)).to.throw('cache id with value 123 is not a string')
    )

    after(() => database.disconnect())
})