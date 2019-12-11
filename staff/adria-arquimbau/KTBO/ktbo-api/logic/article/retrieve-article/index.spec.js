require('dotenv').config()

const { expect } = require('chai')
const retrieveArticle = require('.')
const { database, models: { Article, User } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve article', () => {
    before(() => database.connect(DB_URL_TEST))
    

    let ref, title, description, img, quantity, category, articleId, price

    beforeEach(async () => {
      
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

        const article = await retrieveArticle(articleId)
                expect(article).to.exist
                expect(article._id).to.not.exist
                expect(article.id).to.equal(articleId)
                expect(article.ref).to.equal(ref)
                expect(article.title).to.equal(title)
                expect(article.description).to.equal(description)
                expect(article.img).to.equal(img)
                expect(article.quantity).to.equal(quantity)
                expect(article.category).to.equal(category)
                expect(article.price).to.equal(price)

    }) 

    it('should fail if the id is not a string', () => 
        expect(() => retrieveArticle(123).to.throw(`article with id 123 is not a string`))
    )

    after(() => database.disconnect())
})