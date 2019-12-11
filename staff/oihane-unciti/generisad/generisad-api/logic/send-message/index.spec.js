require('dotenv').config()

const { expect } = require('chai')
const sendMessage = require('.')
const { database, models: { User, Advertisement, Mail, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - send message', () => {
    before(() => database.connect(DB_URL_TEST))
   
    let image, title, description, price, location, date, adId
    let name, surname, email, password, id
    let titleMessage, body
    let domain, name_domain, merchant

    beforeEach(async () => {

        await Mail.deleteMany()
        titleMessage =`title-${Math.random()}`
        body = `msg-${Math.random()}`

        image = `image-${Math.random()}`
        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        price = `price-${Math.random()}`
        location = `location-${Math.random()}`
        date = new Date()

        
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
        const user = await User.create({ name, surname, email, password, merchant_owner: merchant  })
        id = user.id
            
        const userSend = await User.create({ name, surname, email, password, merchant_owner: merchant  })
        idSend = userSend.id
       
        await Advertisement.deleteMany()
        const ad = await Advertisement.create({ image, title, description, price, location, date, owner: id, merchant_owner: merchant  })
        adId = ad.id
    })

    it('should succeed on correct data', async () =>{
        const message = await sendMessage(idSend, adId,titleMessage, body, domain)
            expect(message).to.exist

        const result = await Mail.findById(message) 

            expect(result).to.exist
            expect(result.id).to.equal(message)
            expect(result.title).to.equal(titleMessage)
            expect(result.body).to.equal(body)
            expect(result.merchant_owner.toString()).to.equal(merchant)
    })

    it('should fail on incorrect user id', async () =>{
        let wrongUserId = "5d74a0957005f2ab0c8d5645"
        try{
            await sendMessage(wrongUserId, adId,titleMessage, body, domain)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d74a0957005f2ab0c8d5645 not found`)
        }
    })
    it('should fail on ad id', async () => {
        let wrongAdId = "5d74a0957005f2ab0c8d5645"
        try {
            await sendMessage(idSend, wrongAdId, titleMessage, body, domain)
            throw new Error('should not reach this point')
        }catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('ad with id 5d74a0957005f2ab0c8d5645 not found')
            }
        })

    it('should fail on wrong domain', async () =>{ 
        let wrongDomain= '5d65115f8f58cc540cc376ca'
        try{
            const res = await sendMessage(idSend, adId, titleMessage, body, wrongDomain)
            expect(res).not.to.exist
        }catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`domain ${wrongDomain} not found`)
        }
    })

    it('should fail on empty title', () =>
        expect(() =>
            sendMessage(idSend, adId, " ", body)
        ).to.throw('title is empty or blank')
    )

    it('should fail on undefined image', () =>
        expect(() =>
            sendMessage(idSend, adId, undefined, body)
        ).to.throw(`title with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            sendMessage(idSend, adId, 123, body)
        ).to.throw(`title with value 123 is not a string`)
    )

    it('should fail on empty body', () =>
        expect(() =>
            sendMessage(idSend, adId,titleMessage, " ")
        ).to.throw('body is empty or blank')
    )

    it('should fail on undefined body', () =>
        expect(() =>
            sendMessage(idSend, adId,titleMessage, undefined)
        ).to.throw(`body with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            sendMessage(idSend, adId,titleMessage, 123)
        ).to.throw(`body with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => sendMessage(idSend, adId,titleMessage,body, 123)).to.throw(`domain with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => sendMessage(idSend, adId,titleMessage,body, undefined)).to.throw(`domain with value undefined is not a string`)
    )
    it('should fail on empty or blank', () => 
    expect(() => sendMessage(idSend, adId,titleMessage,body, " ")).to.throw(`domain is empty or blank`)
    )
   
    after(() => database.disconnect())
})