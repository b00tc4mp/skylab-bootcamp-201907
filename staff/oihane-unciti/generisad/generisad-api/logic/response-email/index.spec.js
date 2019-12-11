require('dotenv').config()

const { expect } = require('chai')
const responseEmail = require('.')
const { database, models: { User, Advertisement, Mail, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - conversation message', () => {
    before(() => database.connect(DB_URL_TEST))
    //before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let image, title, description, price, location, date,adId
    let titleAd, body, mailId
    let name, surname, email, password, id ,domain, name_domain, merchant
    beforeEach(async () => {

        await Mail.deleteMany()
        title1 =`titlemessage-${Math.random()}`
        body1 = `msg-${Math.random()}`

        title =`titlemessage-${Math.random()}`
        body = `msg-${Math.random()}`

        image = `image-${Math.random()}`
        titleAd = `title-${Math.random()}`
        description = `description-${Math.random()}`
        price = `price-${Math.random()}`
        location = `location-${Math.random()}`
        date = new Date()

        await Advertisement.deleteMany()
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`


        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password : password, merchant_owner: merchant })
        id = user.id
            
        const userSend = await User.create({name, surname, email, password : password, merchant_owner: merchant  })
        idSend = userSend.id
       
        await Advertisement.deleteMany()
        const ad = await Advertisement.create({ image, title:titleAd, description, price, location, date, owner: id, merchant_owner: merchant })
        adId = ad.id
        
        await Mail.deleteMany()
        const mail = await Mail.create({ sender: idSend, receiver: id, date, title:title1, body:body1, advertisement: adId, merchant_owner: merchant  })
        mailId = mail.id

    })

    it('should succeed on correct data', async () =>{
        const message = await responseEmail(id, mailId, title, body, domain)
            expect(message).to.exist

        const result = await Mail.findById(message) 

            expect(result).to.exist
            expect(result.id).to.equal(message)
            expect(result.title).to.equal(title)
            expect(result.body).to.equal(body)
            expect(result.merchant_owner.toString()).to.equal(merchant)

    })

    it('should fail on incorrect user id', async () =>{
        let wrongUserId = "5d74a0957005f2ab0c8d5645"
        try{
            await responseEmail(wrongUserId, mailId, title, body, domain)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with id 5d74a0957005f2ab0c8d5645 not found`)
        }
    })
    it('should fail on mail id', async () => {
        let wrongMailId = "5d74a0957005f2ab0c8d5645"
        try {
            await responseEmail(id, wrongMailId, title, body, domain)
            throw new Error('should not reach this point')
        }catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('mailId with id 5d74a0957005f2ab0c8d5645 not found')
            }
        })
    

    it('should fail on empty title', () =>
        expect(() =>
            responseEmail(id, mailId, " ", body, domain)
        ).to.throw('title is empty or blank')
    )

    it('should fail on undefined image', () =>
        expect(() =>
            responseEmail(id, mailId, undefined, body, domain)
        ).to.throw(`title with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            responseEmail(id, mailId, 123, body, domain)
        ).to.throw(`title with value 123 is not a string`)
    )

    it('should fail on empty body', () =>
        expect(() =>
            responseEmail(id, mailId, title, " ", domain)
        ).to.throw('body is empty or blank')
    )

    it('should fail on undefined body', () =>
        expect(() =>
            responseEmail(id, mailId, title, undefined, domain)
        ).to.throw(`body with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            responseEmail(id, mailId, title, 123, domain)
        ).to.throw(`body with value 123 is not a string`)
    )

    after(() => database.disconnect())
})