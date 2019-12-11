require('dotenv').config()

const { expect } = require('chai')
const retrieveUserMessage = require('.')
const { database, models: { User, Advertisement, Mail, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retreive message', () => {
    before(() => database.connect(DB_URL_TEST))

    let  title1, body1, title, body, mailID
    let image, titleAd, description, price, location, date, id, idSender
    let name, surname, email, password, adId
    let domain, name_domain, mercha

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
        const user = await User.create({ name, surname, email, password })
        id = user.id
            
        const userSend = await User.create({ name, surname, email, password,  merchant_owner: merchant })
        idSend = userSend.id
       
        await Advertisement.deleteMany()
        const ad = await Advertisement.create({ image, title:titleAd, description, price, location, date, owner: id,  merchant_owner: merchant })
        adId = ad.id
        
        await Mail.deleteMany()
        const mail = await Mail.create({ sender: idSend, receiver: id, date, title:title1, body:body1, advertisement: adId,  merchant_owner: merchant })
        mailId = mail.id

    })

    it('should succeed on correct data', async () =>{
        const message = await retrieveUserMessage(id, domain)
            expect(message).to.exist
            expect(message.length).to.equal(1)
    })

    it('should fail if there are not id', async () =>{ 
        try{
            await retrieveUserMessage('5d7204963b3ea6a2f0c7a6a2', domain)
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id 5d7204963b3ea6a2f0c7a6a2 not found`)
            }
    })
    it('should fail on wrong domain', async () =>{ 
        let wrongDomain= '5d65115f8f58cc540cc376ca'
        try{
        const res = await retrieveUserMessage(id, wrongDomain)
            expect(res).not.to.exist
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`domain ${wrongDomain} not found`)
            }
    })

    it('should fail on wrong ad id type', () => 
    expect(() => retrieveUserMessage(123, domain)).to.throw(`userId with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveUserMessage(undefined, domain)).to.throw(`userId with value undefined is not a string`)
)
    it('should fail on empty or blank', () => 
    expect(() => retrieveUserMessage(" ", domain)).to.throw(`userId is empty or blank`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveUserMessage(id, 123)).to.throw(`domain with value 123 is not a string`)
    )
    it('should fail on wrong ad id type', () => 
    expect(() => retrieveUserMessage(id, undefined)).to.throw(`domain with value undefined is not a string`)
)
    it('should fail on empty or blank', () => 
    expect(() => retrieveUserMessage(id, " ")).to.throw(`domain is empty or blank`)
    )
   
   
    after(() => database.disconnect())
})