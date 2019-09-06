require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister cache', () => {

    let username, email, password, avatar, name, description, lat, lon, difficulty, terrain, hints, owner, id

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


    it('should fail on unexisting user', async () => {

        try {
            await logic.unregisterCache('123456789012', name)
        }
        catch (error) {
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }

    }
    )

    it('should fail on existing user, but not owner', async() => {
        const _user = await User.create({ username, email, password, avatar })
        const id = _user.id
        
        try {
            
            await logic.unregisterCache(id, name)
        }
        catch (error) {
            expect(error.message).to.equal(`wrong credentials`)
        }
    })

    it('should succeed on correct data', async() => {
        const result = await logic.unregisterCache(id, name)
        expect(result).not.to.exist
        const cache = await Cache.findOne({ name })
        expect(cache).not.to.exist
    })

    after(() => database.disconnect())
})
