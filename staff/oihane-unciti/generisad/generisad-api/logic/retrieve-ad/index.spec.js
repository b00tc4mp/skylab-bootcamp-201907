
require('dotenv').config()

const { expect } = require('chai')
const retrieveAd = require('.')
const { database, models: { User, Advertisement } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - retrieve ad', () => {
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
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`

            await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                    id = user.id

                const ad = await Advertisement.create({ img, title, description, location, 'owner': id })
                    adId = ad.id
    })

    it('should succeed on correct data', async () =>{
        const ad = await retrieveAd(adId)
        
                expect(ad).to.exist
                expect(ad.img).to.equal(img)
                expect(ad.title).to.equal(title)
                expect(ad.description).to.equal(description)
                expect(ad.location).to.equal(location)
                expect(ad.owner).to.equal(id)
    })
    it('should fail on wrong ad id', async () => {
        try {
            await retrieveAd('5d5d5530531d455f75da9fF9')
        }catch({ message }) {
            expect(message).to.equal('Ad with id 5d5d5530531d455f75da9fF9 does not exist.')
        }
    })

    it('should fail on empty ad id', () => 
        expect(() => retrieveAd("")).to.throw('Ad id is empty or blank')
    )
    
    it('should fail on wrong ad id type', () => 
        expect(() => retrieveAd(123)).to.throw('Ad id with value 123 is not a string')
    )

   
    after(() => database.disconnect())
})