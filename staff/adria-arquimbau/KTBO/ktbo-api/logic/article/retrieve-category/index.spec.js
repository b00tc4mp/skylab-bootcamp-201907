require('dotenv').config()

const { expect } = require('chai')
const retrieveCategory = require('.')
const { database, models: { Article, User } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve category', () => {
    before(() => database.connect(DB_URL_TEST))
    

    let ref, title, description, img, quantity, category, articleId, price

    beforeEach(async () => {
      
        ref = Number((random()*1000).toFixed())
        title = `title-${random()}`
        description = `description-${random()}`
        img = `imgUrl-${random()}`
        quantity = Number((random()*100).toFixed())
        price = Number((random()*100).toFixed())
        category = value('KTTape Pro Uncut')

        await Article.deleteMany()

        const article = await Article.create({ ref, title, description, img, quantity, category, price })
        articleId = article.id
    })

    it('should succeed on correct data', async () => {

        const article = await retrieveCategory(category)
                expect(article[0]).to.exist
                expect(article[0]._id).to.not.exist
                expect(article[0].id).to.equal(articleId)
                expect(article[0].ref).to.equal(ref)
                expect(article[0].title).to.equal(title)
                expect(article[0].description).to.equal(description)
                expect(article[0].img).to.equal(img)
                expect(article[0].quantity).to.equal(quantity)
                expect(article[0].category).to.equal(category)
                expect(article[0].price).to.equal(price)

    }) 

    /* it('should fail if the id is not a string', () => 
        expect(() => retrieveArticle(123).to.throw(`article with id 123 is not a string`))
    ) */

    after(() => database.disconnect())
})