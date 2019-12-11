
require('dotenv').config()

const { expect } = require('chai')
const retrieveAllAd = require('.')
const { database, models: {User, Advertisement, Merchant} } = require('generisad-data')
//const { random: { number, boolean, value } } = require('generisad-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all ads', () => {
    before(() => database.connect(DB_URL_TEST))
    let image1, title1, description1, price1, location1, date1, image2, title2, description2, price2, location2, date2 

    beforeEach(async () => { 
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
       
        image1 = `img-${Math.random()}`
        title1 = `TitLe-${random()}`
        description1 = `description-${Math.random()}`
        price1 = `price-${Math.random()}`
        location1 = `location-${Math.random()}`
        date1 = new Date()

        image2 = `img-${Math.random()}`
        title2 = `TitLe-${random()}`
        description2 = `description-${Math.random()}`
        price2 = `price-${Math.random()}`
        location2 = `location-${Math.random()}`
        date2 = new Date()

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, merchant_owner: merchant })
        id = user.id       
        
        await Advertisement.deleteMany()
        const ad1 = await Advertisement.create({ image: image1, title: title1, description: description1, price: price1, location: location1, date: date1, owner:id, merchant_owner: merchant })
        adId1 = ad1.id

        const ad2 = await Advertisement.create({image: image2, title: title2, description:  description2, price: price2, location: location2, date: date2, owner:id, merchant_owner: merchant})
        adId2 = ad2.id
    })

    it('should succeed on correct data', async () =>{
        const ad = await retrieveAllAd(domain)
                expect(ad).to.exist
                expect(ad.length).to.equal(2)
                expect(ad[0]).to.exist
                expect(ad[0].image).to.equal(image1)
                expect(ad[0].title).to.equal(title1)
                expect(ad[0].description).to.equal(description1)
                expect(ad[0].price).to.equal(price1)
                expect(ad[0].location).to.equal(location1)
                expect(ad[0].merchant_owner.toString()).to.equal(merchant)

                expect(ad[1]).to.exist
                expect(ad[1].image).to.equal(image2)
                expect(ad[1].title).to.equal(title2)
                expect(ad[1].description).to.equal(description2)
                expect(ad[1].price).to.equal(price2)
                expect(ad[1].location).to.equal(location2)
                expect(ad[1].merchant_owner.toString()).to.equal(merchant)
    })

    it('should fail on wrong domain', async () =>{ 

        let wrongDomain= '5d65115f8f58cc540cc376ca'
        try{
        const res = await retrieveAllAd(wrongDomain)
            expect(res).not.to.exist
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`domain ${wrongDomain} not found`)
            }
    })

    it('should fail on empty or blanck', () => 
    expect(() => retrieveAllAd(" ")).to.throw(`domain is empty or blank`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveAllAd(123)).to.throw(`domain with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveAllAd(undefined)).to.throw(`domain with value undefined is not a string`)

  

    )
    

    after(() => database.disconnect())
})