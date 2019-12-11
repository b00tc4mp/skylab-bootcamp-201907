require('dotenv').config()

const { expect } = require('chai')
const updateArticle = require('.')
const { database, models: { User, Article } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - update article', () => {
    before(() => database.connect(DB_URL_TEST))

    let articleId, ref, title, description, img, quantity, category, price

    beforeEach( async () => {
        
        ref = Number((random()*1000).toFixed())
        title = `title-${random()}`
        description = `description-${random()}`
        img = `imgUrl-${random()}`
        quantity = Number((random()*100).toFixed())
        price = Number((random()*100).toFixed()),
        category = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')


        body = {
            ref : Number((random()*1000).toFixed()),
            title : `title-${random()}`,
            description : `description-${random()}`,
            img : `imgUrl-${random()}`,
            quantity : Number((random()*100).toFixed()),
            price : Number((random()*100).toFixed()),
            category : value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')
        }

        await User.deleteMany()
            const article = await Article.create({ ref, title, description, img, quantity, category, price })
            articleId = article.id
    })

    it('should succeed on correct data', async () => {
        const result = await updateArticle(articleId, body)
            
                expect(result).not.to.exist

                const article = await Article.findById(articleId)
            
                expect(article).to.exist
                expect(article.ref).to.equal(body.ref)
                expect(article.title).to.equal(body.title)
                expect(article.description).to.equal(body.description)
                expect(article.img).to.equal(body.img)
                expect(article.quantity).to.equal(body.quantity)
                expect(article.category).to.equal(body.category)
                expect(article.price).to.equal(body.price)

            
    })
/* 
    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'
        try {
            await updateUser(id, body)
        } catch (error) {
            expect(error.message).to.equal(`user with id ${id} does not exist`)
        }
            
    }) */

    after(() => database.disconnect())
})