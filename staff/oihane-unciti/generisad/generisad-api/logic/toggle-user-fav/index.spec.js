
require('dotenv').config()

const { expect } = require('chai')
const toggleUserFav = require('.')
const { database, models: { User, Advertisement, Merchant } } = require('generisad-data')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - toggle fav', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let name, surname, email, password, favorites, id
    let image, title, description, price, location, date, adId
    let domain, name_domain, merchant

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        favorites= []

        image = `img-${Math.random()}`
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
        const user = await User.create({ name, surname, email, password, favorites, merchant_owner: merchant })
        id = user.id
        await Advertisement.deleteMany()
        const ad = await Advertisement.create({ image, title, description, price, location, date, owner:id, merchant_owner: merchant})
        adId = ad.id
    })

    it('should succeed on correct push', async () =>{
        const result = await toggleUserFav(id, adId)
            expect(result).to.exist
            expect(result.length).to.equal(1) 
            expect(result[0].toString()).to.equal(adId)
    })


    it('should succeed on correct delete', async () =>{
        const user = await User.findById(id)
        user.favorites.push(adId)
        await user.save()
        
        const result = await toggleUserFav(id, adId)
        expect(result).to.exist
        expect(result.length).to.equal(0) 
    })  

    it('should fail if the advertisement ad does not exist', async () => { 
        try{
            await toggleUserFav(id, "5d712e297ea98990acdc78bd")
            const ad = await Advertisement.findById(adId)
            expect(ad).to.be.null
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`advertisement with id 5d712e297ea98990acdc78bd does not exist`)
            
        }
    })
   

    it("should fail on unexisting user" , async () => {
        
        try{
            await toggleUserFav( "5d717e463a7bd156f0294270", adId )
            const ad = await Advertisement.findById(adId)
            expect(ad).to.be.null
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d717e463a7bd156f0294270 is not found `)
        }
            
    })

    it('should fail on empty user id', () => 
        expect(() => toggleUserFav("", adId)).to.throw("userId is empty or blank")
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => toggleUserFav(123, adId)).to.throw('userId with value 123 is not a string')
    )
    
    it('should fail on empty ad id', () => 
        expect(() => toggleUserFav(id, "" )).to.throw('adId is empty or blank')
    )
    
    it('should fail on wrong ad id type', () => 
        expect(() => toggleUserFav( id, 123)).to.throw('adId with value 123 is not a string')
    )

    after(() => database.disconnect())
})