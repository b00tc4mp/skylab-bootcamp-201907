
require('dotenv').config()

const { expect } = require('chai')
const retrieveAd = require('.')
const { database, models: { User, Advertisement, Merchant} } = require('generisad-data')
const { random: { number, boolean, value } } = require('generisad-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve ad detail', () => {
    before(() => database.connect(DB_URL_TEST))
    

    let name, surname, email, password,id
    let image1, title1, description1, price1, location1, date1, adId1
    let image2, title2, description2, price2, location2, date2, adId2
    let domain, name_domain, merchant

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
        const user = await User.create({ name, surname, email, password,  merchant_owner: merchant  })
        id = user.id
        
        await Advertisement.deleteMany()
        const ad1 = await Advertisement.create({ image: image1, title: title1, description: description1, price: price1, location: location1, date: date1, owner:id,  merchant_owner: merchant  })
        adId1 = ad1.id

        const ad2 = await Advertisement.create({image: image2, title: title2, description:  description2, price: price2, location: location2, date: date2, owner:id,  merchant_owner: merchant })
        adId2 = ad2.id
    })


    it('should succeed on correct data', async () =>{
        const ad = await retrieveAd(adId1)
                expect(ad).to.exist
                expect(ad.image).to.equal(image1)
                expect(ad.title).to.equal(title1)
                expect(ad.description).to.equal(description1)
                expect(ad.price).to.equal(price1)
                expect(ad.location).to.equal(location1)
                expect(ad.merchant_owner.toString()).to.equal(merchant)


    })

    it('should fail if there are no ad', async () =>{ 
        try{
        const res = await retrieveAd('5d65115f8f58cc540cc376ca')
            expect(res).not.to.exist
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`Advertisement with id 5d65115f8f58cc540cc376ca does not exist.`)
            }
    })

    it('should fail on empty or blanck', () => 
    expect(() => retrieveAd(" ")).to.throw(`ad id is empty or blank`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveAd(123)).to.throw(`ad id with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveAd(undefined)).to.throw(`ad id with value undefined is not a string`)
)
        
   
    after(() => database.disconnect())
})