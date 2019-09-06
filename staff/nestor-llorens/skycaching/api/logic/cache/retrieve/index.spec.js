require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve cache', () => {
    let username, email, password, avatar, name, description, lat, lon, difficulty, terrain, hints, owner, cacheId, id 

    username = `username-${Math.random()}`
    email = `email-${Math.random()}@domain.com`   
    password = `password-${Math.random()}@domain.com`
    avatar = `path-${Math.random()}`

    name = `name-${Math.random()}`
    description = `description-${Math.random()}`
    lat = Math.random()
    lon = Math.random()
    difficulty = Math.random()
    terrain = Math.random()
    hints = `hints-${Math.random()}`
    
    before(async() => {
        await database.connect(DB_URL_TEST)
            .then(() => User.deleteMany())
            .then(() => Cache.deleteMany())

        const user = await User.create({ username, email, password, avatar })
        id = user.id
        owner = id

        const cache = await Cache.create({ owner, name, description, lat, lon, difficulty, terrain, hints})
        cacheId = cache.id
    })    

    it('should succeed on correct data', async() => {
        
        const cache = await logic.retrieveCache(cacheId)

        expect(cache).to.exist
    
        expect(cache.id).to.equal(cacheId)
        expect(cache.owner.toString()).to.equal(id)
        expect(cache.name).to.equal(name)
        expect(cache.description).to.equal(description)
        expect(cache.lat).to.equal(lat)
        expect(cache.lon).to.equal(lon)
        expect(cache.difficulty).to.equal(difficulty)
        expect(cache.terrain).to.equal(terrain)

    })

    it('should fail on wrong id', async() => {
        
        try {
            await logic.retrieveCache('wrongCacheId')
        }catch(error) {
            expect(error.message).to.equal("cache with id wrongCacheId not found")
        }

    })

    after(() => database.disconnect())
})