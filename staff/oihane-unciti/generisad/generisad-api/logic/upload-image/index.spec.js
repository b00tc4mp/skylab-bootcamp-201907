
require('dotenv').config()

const { expect } = require('chai')
const uploadImage = require('.')
const { database, models: { User, Advertisement, Merchant } } = require('generisad-data')
const { random } = Math
const fs = require('fs')

const { env: { DB_URL_TEST } } = process

describe('logic - upload image', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, favorites, image, title, description, price, location, date, id, adId
    let domain, name_domain, merchant

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        favorites = []

        title = `TitLe-${random()}`
        description = `description-${Math.random()}`
        price = `price-${Math.random()}`
        location = `location-${Math.random()}`
        date = new Date()

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, favorites, merchant_owner: merchant   })
        id = user.id

        await Advertisement.deleteMany()
        const ad = await Advertisement.create({ title, description, price, location, date, owner: id , merchant_owner: merchant  })
        adId = ad.id

        image = fs.createReadStream('./test/smiley.png')
    })

    it('should succeed on correct image', async () => {
        const result = await uploadImage(id, adId, image)

        expect(result).not.to.exist

        const ad = await Advertisement.findById(adId)

        expect(ad).to.exist
        expect(ad.image).to.exist
        expect(ad.image).to.have.length.above(0)
        expect(ad.owner.toString()).to.equal(id)
    })
    it('should fail if the user ad does not exist', async () => { 
        try{
            await uploadImage('5d7204963b3ea6a2f0c7a6a2', adId, image)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with userId 5d7204963b3ea6a2f0c7a6a2 not found`)
            
        }
    })

    it('should fail if the ad  does not exist', async () => { 
        try{
            await uploadImage( id, "5d712e297ea98990acdc78bd", image)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`ad with adId 5d712e297ea98990acdc78bd not found`)
            
        }
    })

    it('should fail on wrong user id type', () => 
    expect(() => uploadImage(123, adId, image)).to.throw(`userId with value 123 is not a string`)
    ) 
    
    it('should fail on wrong ad id type', () => 
    expect(() => uploadImage(undefined, adId, image)).to.throw(`userId with value undefined is not a string`)
    )
    it('should fail on empty or blank', () => 
    expect(() => uploadImage(" ", adId, image)).to.throw(`userId is empty or blank`)
    )

    it('should fail on wrong ad id type', () => 
    expect(() => uploadImage(id, 123, image)).to.throw(`adId with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => uploadImage(id, undefined, image)).to.throw(`adId with value undefined is not a string`)
    )
    it('should fail on empty or blank', () => 
    expect(() => uploadImage(id, " ", image)).to.throw(`adId is empty or blank`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => uploadImage(id, 123, image)).to.throw(`adId with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => uploadImage(id, undefined, image)).to.throw(`adId with value undefined is not a string`)
    )
    it('should fail on empty or blank', () => 
    expect(() => uploadImage(id, " ", image)).to.throw(`adId is empty or blank`)
    )
    it('should fail on wrong image type', () => 
    expect(() => uploadImage(id, adId, 123)).to.throw(`stream with value 123 is not an object`)
    )
    it('should fail on wrong image type', () => 
    expect(() => uploadImage(id, adId, undefined)).to.throw(`stream with value undefined is not an object`)
    )
    it('should fail on empty or blank', () => 
    expect(() => uploadImage(id, adId, "")).to.throw(`stream with value  is not an object`)
    )
    



    after(() => database.disconnect())
})