require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - register cache', () => {
    let username, email, password, avatar, name, description, lat, lon, difficulty, terrain, hints

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
    })    
    
    it('should succeed on correct data', async() => {
        
        const _id = await logic.registerCache(id, name, description, lat, lon, difficulty, terrain, hints)

        expect(_id).to.be.a('string')
        

        const [user, cache] = await Promise.all([User.findById(id), Cache.findById(_id)])
        
        expect(user).to.exist
        expect(cache).to.exist
        
        expect(user.id).to.equal(cache.owner.toString())
        expect(cache.name).to.equal(name)
        expect(cache.description).to.equal(description)
        expect(cache.lat).to.equal(lat)
        expect(cache.lon).to.equal(lon)
        expect(cache.difficulty).to.equal(difficulty)
        expect(cache.terrain).to.equal(terrain)
        expect(cache.hints).to.equal(hints)
        
    })

    it('should fail on a cache that already exists', async() => {

        try {
            await logic.registerCache(id, name, description, lat, lon, difficulty, terrain, hints)
        }
        catch (error) {
            expect(error.message).to.equal(`cache with name ${name} already exists`)
        }
        
    })

    after(() => database.disconnect())
})