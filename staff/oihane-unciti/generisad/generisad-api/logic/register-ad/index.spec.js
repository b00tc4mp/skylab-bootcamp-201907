
require('dotenv').config()

const { expect } = require('chai')
const registerAd = require('.')
const { database, models: { User, Advertisement, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register ad', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, userId ,domain, name_domain, merchant, id
    
    
    let image, title, description, price, location

    beforeEach(async () => {
        image = `image-${Math.random()}`
        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        price = `price-${Math.random()}`
        location = `location-${Math.random()}`
        date = new Date()

        await Advertisement.deleteMany()
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password : password, merchant_owner: merchant })
        id = user.id
    })

    it('should succeed on correct data', async () =>{
        const idAdvertisement = await registerAd(image, title, description, price, location, id, domain)
        const result = await Advertisement.findById(idAdvertisement) 
    
            expect(result).to.exist
            expect(result.id).to.equal(idAdvertisement)
            expect(result.title).to.equal(title)
            expect(result.description).to.equal(description)
            expect(result.price).to.equal(price)
            expect(result.location).to.equal(location)
            expect(result.owner.toString()).to.equal(id)
            expect(result.merchant_owner.toString()).to.equal(merchant)

    })

    it('should fail on incorrect user id', async () =>{
        let wrongUserId = "5d74a0957005f2ab0c8d5645"
        try{
            await registerAd(image, title, description, price, location, wrongUserId, domain)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d74a0957005f2ab0c8d5645 not found`)
        }
    })

    it('should fail on empty image', () =>
        expect(() =>
            registerAd('',title, description, price, location, domain)
        ).to.throw('image is empty or blank')
    )

    it('should fail on undefined image', () =>
        expect(() =>
            registerAd(undefined, title, description, price,location, domain)
        ).to.throw(`image with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(123, title, description, price, location, domain)
        ).to.throw(`image with value 123 is not a string`)
    )

    it('should fail on empty title', () =>
        expect(() =>
            registerAd( image, "", description, price, location, domain)
        ).to.throw('title is empty or blank')
    )

    it('should fail on undefined title', () =>
        expect(() =>
            registerAd(image, undefined, description, price, location, domain)
        ).to.throw(`title with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(image, 123, description, price, location, domain)
        ).to.throw(`title with value 123 is not a string`)
    )

    it('should fail on empty description', () =>
        expect(() =>
            registerAd( image, title, "", price, location, domain )
        ).to.throw(`description is empty or blank`)
    )

    it('should fail on undefined description', () =>
        expect(() =>
            registerAd( image, title, undefined, price, location, domain)
        ).to.throw(`description with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(image, title, 123, price, location, domain)
        ).to.throw(`description with value 123 is not a string`)
    )

    it('should fail on empty price', () =>
        expect(() =>
            registerAd(image, title, description, "", location, domain)
        ).to.throw(`price is empty or blank`)
    )

    it('should fail on undefined price', () =>
        expect(() =>
            registerAd( image, title, description, undefined, location, domain)
        ).to.throw(`price with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(image, title, description, 123, location, domain)
        ).to.throw(`price with value 123 is not a string`)
    )

    it('should fail on empty location', () =>
        expect(() =>
            registerAd(image, title, description, price, "", domain)
        ).to.throw(`location is empty or blank`)
    )

    it('should fail on undefined location', () =>
        expect(() =>
            registerAd( image, title, description, price, undefined, domain)
        ).to.throw(`location with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            registerAd(image, title, description, price,  123, domain)
    ).to.throw(`location with value 123 is not a string`)

    )
   
    after(() => database.disconnect())
})