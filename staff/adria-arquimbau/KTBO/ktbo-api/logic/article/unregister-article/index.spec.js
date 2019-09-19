require('dotenv').config()

const { expect } = require('chai')
const unregisterArticle = require('.')
const { database, models: { User, Article } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - unregister article', () => {
    before(() => database.connect(DB_URL_TEST))

    let articleId, ref, title, description, img, quantity, category, price
    let company, country, email, password, role


    beforeEach(async () => {

        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = value('admin')

        await User.deleteMany()
            const user = await User.create({ company, country, email, password, role })
            userId = user.id

        ref = Number((random()*1000).toFixed())
        title = `title-${random()}`
        description = `description-${random()}`
        img = `imgUrl-${random()}`
        quantity = Number((random()*100).toFixed())
        price = Number((random()*100).toFixed())
        category = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')


        await Article.deleteMany()
            const article = await Article.create({ ref, title, description, img, quantity, category, price })
            articleId = article.id
    })

    it('should succeed on correct data', async () => {
        const result = await unregisterArticle(articleId, userId, password)
            
                expect(result).not.to.exist

                const article = await Article.findById(articleId)
                expect(article).not.to.exist
            
    })

   /*  it('should fail on unexisting user', async () => {
        try {
            await unregisterUser('5d5d5530531d455f75da9fF9', password)
        } catch (error) {
            expect(error.message).to.equal('wrong credentials')    
        }
    })

    it('should fail on existing user, but wrong password', async () => {
        try {
            unregisterUser(id, 'wrong-password')         
        } catch (error) {
            expect(error.message).to.equal('wrong credentials')
        }
    }) */

    after(() => database.disconnect())
})