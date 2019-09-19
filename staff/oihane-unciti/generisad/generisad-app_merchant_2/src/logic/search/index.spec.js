import logic from '.'
import { database, models } from 'generisad-data'
import jwt from 'jsonwebtoken'

const { User, Advertisement, Merchant } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - search', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, userId
    let domain, name_domain, merchant
    let image1, title1, description1, price1, date1, location1, product1Id
    let image2, title2, description2, price2, date2, location2, product2Id
    let query

    let token
    beforeEach(async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`


        image1 = `img-${Math.random()}`
        title1 = `TitLe-${Math.random()}`
        description1 = `description-${Math.random()}`
        price1 = `price-${Math.random()}`
        location1 = `location-${Math.random()}`
        date1 = new Date()

        image2 = `img-${Math.random()}`
        title2 = `TitLe-${Math.random()}`
        description2 = `description-${Math.random()}`
        price2 = `price-${Math.random()}`
        location2 = `location-${Math.random()}`
        date2 = new Date()

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

    try{
        debugger
       await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id
    
        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, merchant_owner: merchant })
        userId = user.id
        
        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.userCredentials = token

        await Advertisement.deleteMany()

        const product1 = await Advertisement.create({ image: image1, title: title1, description: description1, price: price1, location: location1, date: date1, owner:userId, merchant_owner: merchant }) 
        product1Id= product1.id
        const product2 = await Advertisement.create({image: image2, title: title2, description:  description2, price: price2, location: location2, date: date2, owner:userId, merchant_owner: merchant})
        product2Id= product2.id 
    }catch(error){
        debugger
        console.log(error)
    }
        
    })
    it('should succeed on correct data', async () =>{
        query = "title"
        debugger
        const result = await logic.search(query, domain)
                expect(result[0]).query = "title"
        // const ad = await search(query, domain)
        //         expect(ad[0]).toBeDefined()
        //         expect(ad[0].image).toBe(image1)
        //         expect(ad[0].title).toBe(title1)
        //         expect(ad[0].description).toBe(description1)
        //         expect(ad[0].price).toBe(price1)
        //         expect(ad[0].location).toBe(location1)

        //         expect(ad[1]).to.exist
        //         expect(ad[1].image).toBe(image2)
        //         expect(ad[1].title).toBe(title2)
        //         expect(ad[1].description).toBe(description2)
        //         expect(ad[1].price).toBe(price2)
        //         expect(ad[1].location).toBe(location2)
    })

    //afterAll(() => database.disconnect())
})
