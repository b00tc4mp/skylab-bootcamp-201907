require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User, Cache }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve near caches', () => {

    before(async () => 
        await database.connect(DB_URL_TEST)
        .then(() => User.deleteMany())
        .then(() => Cache.deleteMany())
    )

    let username, email, password, avatar, name, description, lng, lat, location, randomTerr, hints, randomDiff,
    name2, description2, lng2, lat2, location2, randomTerr2, hints2, randomDiff2, distance

    beforeEach(async () => {

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}@domain.com`
        avatar = `path-${Math.random()}`
        userLocation = { type: 'Point', coordinates: [2.1894, 41.403] }

        name = `name-${Math.random()}`
        description = `description-${Math.random()}`
        lng = 2.1895
        lat = 41.404
        location = { type: 'Point', coordinates: [lng, lat] } 
        difficulty = [1,2,3]
        terrain = [1,2,3]
        randomDiff = difficulty[Math.floor(Math.random()*difficulty.length)]
        randomTerr = terrain[Math.floor(Math.random()*terrain.length)]
        hints = `hints-${Math.random()}`

        name2 = `name-${Math.random()}`
        description2 = `description-${Math.random()}`
        lng2 = 2.1896
        lat2 = 41.405
        location2 = { type: 'Point', coordinates: [lng2, lat2] } 
        difficulty2 = [1,2,3]
        terrain2 = [1,2,3]
        randomDiff2 = difficulty2[Math.floor(Math.random()*difficulty2.length)]
        randomTerr2 = terrain2[Math.floor(Math.random()*terrain2.length)]
        hints2 = `hints-${Math.random()}`

        name3 = `name-${Math.random()}`
        description3 = `description-${Math.random()}`
        lng3 = 85
        lat3 = 6
        location3 = { type: 'Point', coordinates: [lng3, lat3] } 
        difficulty3 = [1,2,3]
        terrain3 = [1,2,3]
        randomDiff3 = difficulty2[Math.floor(Math.random()*difficulty2.length)]
        randomTerr3 = terrain2[Math.floor(Math.random()*terrain2.length)]
        hints3 = `hints-${Math.random()}`
        
        const user = await User.create({ username, email, password, avatar, location: userLocation })
        id = user.id

        const cache = await Cache.create({ owner: id, name, description, location, difficulty: randomDiff, terrain: randomTerr, hints})
        cacheId = cache.id

        const cache2 = await Cache.create({ owner: id, 'name': name2, 'description': description2, 'location': location2, difficulty: randomDiff2, terrain: randomTerr2, 'hints': hints2})
        cache2Id = cache2.id

        const cache3 = await Cache.create({ owner: id, 'name': name3, 'description': description3, 'location': location3, difficulty: randomDiff3, terrain: randomTerr3, 'hints': hints3})
        cache3Id = cache3.id

    })    

    it('should succeed on correct data', async() => {
        distance = 1000
        const caches = await logic.retrieveNear(id, distance)
        debugger
        expect(caches[0]).to.exist
        expect(caches[0].name).to.equal(name)
        expect(caches[1]).to.exist
        expect(caches[1].name).to.equal(name2)
        expect(caches[2]).to.not.exist
           
    })

    after(() => database.disconnect())
})