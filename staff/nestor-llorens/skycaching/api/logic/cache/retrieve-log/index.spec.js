require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve logged caches', () => {

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

        user.found.push(cacheId)
        await user.save()


    })    

    it('should succeed on correct data', async() => {
        
        const result = await logic.retrieveLog(id)
    
        expect(result).to.exist
        expect(result[0]).to.exist
        expect(result[0].id).to.equal(cacheId) 
    })

    after(() => database.disconnect())
})