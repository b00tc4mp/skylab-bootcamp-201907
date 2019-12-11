import logic from '..'

import { database, models } from 'generisad-data'
const jwt = require('jsonwebtoken') 

const { User, Advertisement, Merchant } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe.only('logic - register ad', () => {
    let name, surname, email, password, userId ,domain, name_domain, merchant 
    let image, title, description, price, location, date
    let token
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
    beforeEach(async () => { 
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        image = `image-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        price = `price-${random()}`
        date = new Date()
        location = `location-${random()}`

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id
     

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, merchant_owner: merchant })
        userId = user.id

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.userCredentials = token
        debugger

    })

    it('should succeed on correct data', async () => {debugger
        const idAdvertisement = await logic.publish(image, title, description, price, location, userId, domain)
        const result = await Advertisement.findById(idAdvertisement) 
            expect(result).toBeDefined()
            expect(result.id).toBe(idAdvertisement)
            expect(result.image).toBe(image)
            expect(result.title).toBe(title)
            expect(result.description).toBe(description)
            expect(result.price).toBe(price)
            expect(result.location).toBe(location)
            expect(result.owner.toString()).toBe(id)
            expect(result.merchant_owner.toString()).toBe(merchant)
    })

    // it('should fail if the user ad does not exist', async () => {
    //     try {
    //         await logic.removeAd( "5d712e297ea98990acdc78bd")
    //         throw Error('should not arrive here')
    //     } catch (error) {
    //         expect(error).toBeDefined()
    //         expect(error.message).toBe(`advertisement with id 5d712e297ea98990acdc78bd does not exist`)

    //     }
    // })


    // it("should fail on unexisting user" , async () => {

    //     try{
    //         await logic.removeAd( "5d712e2v7ea98990acdc78bd", adId )
    //         const ad = await Advertisement.findById(adId)
    //         expect(ad).toBeUndefined()
    //     }catch(error){
    //         expect(error).toBeDefined()
    //         //expect(error.message).toBe(`user with id 5d712e2v7ea98990acdc78bd is not owner of advertisement with id ${adId}`)
    //     }

    // })
    // it('should fail on empty user id', () => 
    //     expect(() => removeAd("", adId)).to.throw('user id is empty or blank')
    // )

    // it('should fail on wrong user id type', () => 
    //     expect(() => removeAd( 123, adId)).to.throw('user id with value 123 is not a string')
    // )

    // it('should fail on empty ad id', () => 
    //     expect(() => removeAd(userId, "" )).to.throw('id is empty or blank')
    // )

    // it('should fail on wrong ad id type', () => 
    //     expect(() => removeAd( userId, 123 )).to.throw('id with value 123 is not a string')
    // )


    afterAll(() => database.disconnect())
})

