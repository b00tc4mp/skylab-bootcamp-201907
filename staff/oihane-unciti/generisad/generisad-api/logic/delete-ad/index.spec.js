
require('dotenv').config()

const { expect } = require('chai')
const deleteAd = require('.')
const { database, models: { User, Advertisement,  Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - delete ad', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, userId, domain, name_domain, merchant

    let image, title, description, price, date, location, adId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        image = `image-${Math.random()}`
        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        price = `price-${Math.random()}`
        date = new Date()
        location = `location-${Math.random()}`

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id
    

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password : password, merchant_owner: merchant })
        userId = user.id
        
        await Advertisement.deleteMany()
        const ad = await Advertisement.create({ image, title, description, price, location, date, 'owner': userId, merchant_owner:merchant})
        adId = ad.id

    })

    it('should succeed on correct data', async () => { 
        await deleteAd(userId , adId)
        try{
            const ad = await Advertisement.findById(adId)
            expect(ad).to.be.null
        }catch(error){
            throw Error("should not reach this point")
        }
                
    })
    it('should fail if the user ad does not exist', async () => { 
        try{
            await deleteAd( userId, "5d712e297ea98990acdc78bd")
            const ad = await Advertisement.findById(adId)
            expect(ad).to.be.null
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`advertisement with id 5d712e297ea98990acdc78bd does not exist`)
            
        }
    })
   

    it("should fail on unexisting user" , async () => {
        
        try{
            await deleteAd( "5d712e2v7ea98990acdc78bd", adId )
            const ad = await Advertisement.findById(adId)
            expect(ad).to.be.null
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d712e2v7ea98990acdc78bd is not owner of advertisement with id ${adId}`)
        }
            
    })
    it('should fail on empty user id', () => 
        expect(() => deleteAd("", adId)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => deleteAd( 123, adId)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty ad id', () => 
        expect(() => deleteAd(userId, "" )).to.throw('id is empty or blank')
    )
    
    it('should fail on wrong ad id type', () => 
        expect(() => deleteAd( userId, 123 )).to.throw('id with value 123 is not a string')
    )

   
    after(() => database.disconnect())
})