require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve cache', () => {

    before(async () => 
        await database.connect(DB_URL_TEST)
        .then(() => User.deleteMany())
        .then(() => Cache.deleteMany())
    )

    let username, email, password, avatar, name, description, lng, lat, location, randomTerr, hints, randomDiff

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
        
        const user = await User.create({ username, email, password, avatar })
        id = user.id

        const cache = await Cache.create({ owner: id, name, description, location, difficulty: randomDiff, terrain: randomTerr, hints})
        cacheId = cache.id
    })    

    it('should succeed on correct data', async() => {
        
        const cache = await logic.retrieveCache(cacheId)
        debugger
        expect(cache).to.exist
    
        expect(cache.id).to.equal(cacheId)
        expect(cache.owner.id).to.equal(id)
        expect(cache.name).to.equal(name)
        expect(cache.description).to.equal(description)
        
        expect(cache.location.coordinates).to.deep.equal(location.coordinates)
        expect(cache.location.type).to.equal(location.type)
        debugger
        expect(cache.difficulty).to.equal(randomDiff)
        expect(cache.terrain).to.equal(randomTerr)

    })

    it('should fail on wrong id', async() => {
        
        try {
            await logic.retrieveCache('wrongCacheId')
        }catch(error) {
            expect(error.message).to.equal("cache with id wrongCacheId not found")
        }
    })

    it('should fail on empty user id', () =>
    expect(() => logic.retrieveCache("")).to.throw('id is empty or blank')
)

    it('should fail on wrong user id type', () =>
    expect(() => logic.retrieveCache(123)).to.throw('id with value 123 is not a string')
)

    after(() => database.disconnect())
})