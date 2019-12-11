require('dotenv').config()

const { expect } = require('chai')
const unreadMessage = require('.')
const { database, models: { User, Advertisement, Mail, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - unread Message', () => {
    before(() => database.connect(DB_URL_TEST))
   
    let image, title, description, price, location, date, adId
    let name, surname, email, password, id
    let title2, body2, title1, body1
    let domain, name_domain, merchant

    beforeEach(async () => {

        await Mail.deleteMany()

        title1 =`titlemessage-${Math.random()}`
        body1 = `msg-${Math.random()}`

        title2 =`titlemessage-${Math.random()}`
        body2 = `msg-${Math.random()}`

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

        await Mail.deleteMany()
        const mail = await Mail.create({ sender: idSend, receiver: id, date, title:title1, body:body1, advertisement: adId, merchant_owner: merchant  })
        mailId = mail.id
    })

    it('should succeed on correct data', async () =>{
        const message = await unreadMessage(id, domain)
        expect(message[0].read).to.equal(false)
    })

    it('should fail on incorrect user id', async () =>{
        let wrongUserId = "5d74a0957005f2ab0c8d5645"
        try{
            await unreadMessage(wrongUserId, domain)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d74a0957005f2ab0c8d5645 not found`)
        }
    })
    it('should fail on ad id', async () => {
        let wrongDomain = "5d74a0957005f2ab0c8d5645"
        try {
            await unreadMessage(id, wrongDomain)
            throw new Error('should not reach this point')
        }catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('domain 5d74a0957005f2ab0c8d5645 not found')
            }
        })

    it('should fail on empty title', () =>
        expect(() =>
        unreadMessage(" ", domain)
        ).to.throw('userId is empty or blank')
    )

    it('should fail on undefined image', () =>
        expect(() =>
            unreadMessage(undefined, domain)
        ).to.throw(`userId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
        unreadMessage(123, domain)
        ).to.throw(`userId with value 123 is not a string`)
    )

    
   
    after(() => database.disconnect())
})