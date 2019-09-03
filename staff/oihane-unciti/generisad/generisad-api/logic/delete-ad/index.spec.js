
require('dotenv').config()

const { expect } = require('chai')
const deleteUser = require('.')
const { database, models: { User, Advertisement } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - retrieve ad', () => {
    before(() => database.connect(DB_URL_TEST))
    //before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let img, title, description, location

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        img = `img-${Math.random()}`
        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        location = `location-${Math.random()}`
    

        await User.deleteMany()
            const user = await User.create({ name, surname, email, password })
                userId = user.id
                await Advertisement.deleteMany()
                const ad = new Advertisement({ img, title, description, location })
                adId = ad.id
                ad.owner.push(userId)
                await ad.save()

    })

    it('should succeed on correct data', async () => {
        await deleteAd(adId , userId)
            const ad = await Advertisement.findOne({ adId })
                expect(add).not.to.exist
    })

    it('should fail on right vehicle and unexisting user', async () => {
        try{
            await deleteAd(adId , '5d5d5530531d455f75da9fF9')
            throw Error('should not reach this point') 
        }catch({ message }) {
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it('should fail on existing user and unexisting vehicle', async () => {
        try{
            await deleteAd('5d5d5530531d455f75da9fF9' , userId)
            throw Error('should not reach this point') 
        }catch({ message }) {
            expect(message).to.equal('vehicle with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it("should fail on unregistering a ad by a user who is not an owner" , async () => {
        let _name = `name-${Math.random()}`
        let _surname = `surname-${Math.random()}`
        let _email = `email-${Math.random()}@domain.com`
        let _password = `password-${Math.random()}`

        const user1 = await User.create({ name , surname , email , password })
        const user2 = await User.create({ name : _name , surname : _surname , email : _email , password : _password })
            userId = user1.id
            userId2 = user2.id

            const ad = new Vehicle({ img, title, description, location })
            adId = ad.id
            ad.owner.push(adId)
            await ad.save()

            try{
                await deleteAd( ad.id , userId2 ) 
            }catch({ message }) {
                expect(message).to.equal(`user with id ${userId2} is not owner of advertisement with id ${vehicle.id}`)
            }
    })

    it('should fail on empty ad id', () => 
        expect(() => deleteAd("" , userId)).to.throw('Advertisement id is empty or blank')
    )
    
    it('should fail on wrong advertisement id type', () => 
        expect(() => deleteAd(123 , userId)).to.throw('Advertisement id with value 123 is not a string')
    )
    
    it('should fail on empty user id', () => 
        expect(() => deleteAd(adId , "")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => deleteAd(adId , 123)).to.throw('user id with value 123 is not a string')
    )

   
    after(() => database.disconnect())
})