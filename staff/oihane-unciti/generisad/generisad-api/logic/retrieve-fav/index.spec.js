
require('dotenv').config()

const { expect } = require('chai')
const retrieveFav = require('.')
const { database, models: { User, Advertisement, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process
const { random } = Math
describe('logic - retrieve user fav', () => {
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
        const user = await User.create({ name, surname, email, password, merchant_owner: merchant })
        id = user.id
        await Advertisement.deleteMany()
        const ad1 = await Advertisement.create({ image: image1, title: title1, description: description1, price: price1, location: location1, date: date1, owner:id , merchant_owner: merchant})
        adId1 = ad1.id

        const ad2 = await Advertisement.create({image: image2, title: title2, description:  description2, price: price2, location: location2, date: date2, owner:id, merchant_owner: merchant})
        adId2 = ad2.id
        user.favorites.push(adId1)
        user.favorites.push(adId2)
        await user.save()
    })

    it('should succeed on correct data', async () =>{
        const result = await retrieveFav(id, domain)
                expect(result).to.exist
                expect(result.favorites.length).to.equal(2)
              
    })

    it('should fail if the user ad does not exist', async () => { 
        try{
             await retrieveFav("5d712e297ea98990acdc78bd", domain)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`User with id 5d712e297ea98990acdc78bd does not exist.`)
            
        }
    })
    
    it('should fail on wrong domain', async () =>{ 

        let wrongDomain= '5d65115f8f58cc540cc376ca'
        try{
        const res = await retrieveFav(id, wrongDomain)
            expect(res).not.to.exist
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`domain ${wrongDomain} not found`)
            }
    })

    it('should fail on empty or blanck', () => 
    expect(() => retrieveFav(id, " ")).to.throw(`domain is empty or blank`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveFav(id, 123)).to.throw(`domain with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveFav(id, undefined)).to.throw(`domain with value undefined is not a string`)
    )
    it('should fail on empty user id', () => 
    expect(() => retrieveFav("", domain)).to.throw("userId is empty or blank")
    )
    it('should fail on empty user id', () => 
    expect(() => retrieveFav(undefined, domain)).to.throw("userId with value undefined is not a string")
    )

    it('should fail on wrong user id type', () => 
    expect(() => retrieveFav(123, domain)).to.throw('userId with value 123 is not a string')
    )

   
    after(() => database.disconnect())
})