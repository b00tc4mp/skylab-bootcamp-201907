require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST }} = process

const bcrypt = require('bcryptjs')

describe('logic - unregister cache', () => {

    before(async() => 
        await database.connect(DB_URL_TEST)
            .then(() => User.deleteMany())
            .then(() => Cache.deleteMany())
    )
            
    let username, email, password, avatar, name, description, lat, lng, difficulty, terrain, hints

    beforeEach(async () => {

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
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

        const hash = await bcrypt.hash(password, 10)
        
        const user = await User.create({ username, password: hash, email, avatar })
        userId = user.id
        const cache = await Cache.create({ owner: userId, name, description, location, randomDiff, randomTerr, hints})
        cacheId = cache.id

    })

    it('should succeed o correct data', async () => {
        const result = await logic.unregisterCache(userId, password, cacheId)
        expect(result).to.not.exist 

        const cache = await Cache.findById(cacheId)
        expect(cache).not.to.exist


    })

    it('should fail on unexisting user', async () => {

        try {
            await logic.unregisterCache('123456789012', password, cacheId)
        }
        catch (error) {
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }

    
    })

    it('should fail on unexisting cache', async () => {

        try {
            await logic.unregisterCache(userId, password, '123456789012')
        }
        catch (error) {
            expect(error.message).to.equal(`cache with id 123456789012 does not exist`)
        }

    
    })

    it('should fail on wrong password', async () => {

        try {
            await logic.unregisterCache(userId, 'wrongPassword', cacheId)
        }
        catch (error) {
            expect(error.message).to.equal(`wrong credentials`)
        }

    
    })

    it('should fail on existing user, but not owner', async() => {
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ username, password: hash, email, avatar })
        const id = user.id
    
        try {
            
            await logic.unregisterCache(id, password, cacheId)
        }
        catch (error) {
            expect(error.message).to.equal(`${id} is not the cache owner`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() => logic.unregisterCache('', password, cacheId)).to.throw('id is empty or blank')
    )

    it('should fail on empty password', () =>
        expect(() => logic.unregisterCache(userId, '', cacheId)).to.throw('password is empty or blank')
    )
    it('should fail on empty cacheId', () =>
        expect(() => logic.unregisterCache(userId, password, '')).to.throw('cache id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.unregisterCache(123, password, cacheId)).to.throw(`user id with value 123 is not a string`)
    )

    it('should fail on wrong password type', () =>
        expect(() => logic.unregisterCache(userId, 123, cacheId)).to.throw(`password with value 123 is not a string`)
    )

    it('should fail on wrong cache id type', () =>
        expect(() => logic.unregisterCache(userId, password, 123)).to.throw(`cache id with value 123 is not a string`)
    )

    after(() => database.disconnect())
})
