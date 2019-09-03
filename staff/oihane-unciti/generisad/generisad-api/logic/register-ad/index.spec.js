
require('dotenv').config()

const { expect } = require('chai')
const registerAd = require('.')
const { database, models: { User, Advertisement } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - register ad', () => {
    before(() => database.connect(DB_URL_TEST))
    //before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let img, title, description, location

    beforeEach(async () => {
        img = `img-${Math.random()}`
        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        location = `location-${Math.random()}`

        await Advertisement.deleteMany()
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name, surname, email, password })
                id = user.id
    })

    it('should succeed on correct data', async () =>{debugger
        const result = await registerAd(img, title, description, location)
            adId = result
            expect(adId).to.exist

            const ad = await Advertisement.findOne({ img })
                expect(ad).to.exist
                expect(ad.id).to.equal(adId)
                expect(ad.img).to.equal(img)
                expect(ad.title).to.equal(title)
                expect(ad.description).to.equal(description)
                expect(ad.location).to.equal(location)
    })
    it('should fail if the vehicle already exists', async () => {
        await Vehicle.create({ img, title, description, location })
            try{
                await registerAd(id, img, title, description, location)
            }catch(error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`Vehicle already exists.`)
            }    
    })

    it('should fail on empty img', () =>
        expect(() =>
            registerAd(id, '', model, year, type, color, electric, plate)
        ).to.throw('img is empty or blank')
    )

    it('should fail on undefined img', () =>
        expect(() =>
            registerAd(id, undefined,title, description, location)
        ).to.throw(`img with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(id, 123, title, description, location)
        ).to.throw(`img with value 123 is not a string`)
    )

    it('should fail on empty title', () =>
        expect(() =>
            registerAd(id, img, "", description, location)
        ).to.throw('title is empty or blank')
    )

    it('should fail on undefined title', () =>
        expect(() =>
            registerAd(id, img, undefined, description, location)
        ).to.throw(`title with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(id, img, 123, description, location)
        ).to.throw(`title with value 123 is not a string`)
    )

    it('should fail on empty description', () =>
        expect(() =>
            registerAd(img, title, "", location)
        ).to.throw(`year with value  is not a description`)
    )

    it('should fail on undefined description', () =>
        expect(() =>
            registerAd(id, img, title, undefined, location)
        ).to.throw(`description with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(id, img, title, 123, location)
        ).to.throw(`title with value 123 is not a string`)
    )

    it('should fail on empty location', () =>
        expect(() =>
            registerAd(img, title, description, "")
        ).to.throw(`year with value  is not a location`)
    )

    it('should fail on undefined location', () =>
        expect(() =>
            registerAd(id, img, title, description, undefined)
        ).to.throw(`location with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(id, img, title, description, 123)
    ).to.throw(`location with value 123 is not a string`)

    )
   
    after(() => database.disconnect())
})