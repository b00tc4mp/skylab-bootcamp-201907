require('dotenv').config()

const { expect } = require('chai')
const retrieveAllArticles = require('.')
const { database, models: { Article } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all articles', () => {
    before(() => database.connect(DB_URL_TEST))
    

    beforeEach(async () => {

        ref1 = Number((random()*1000).toFixed())
        title1 = `title-${random()}`
        description1 = `description-${random()}`
        img1 = `imgUrl-${random()}`
        quantity1 = Number((random()*100).toFixed())
        price1 = Number((random()*100).toFixed())
        category1 = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')

        ref2 = Number((random()*1000).toFixed())
        title2 = `TitLe-${random()}`
        description2 = `description-${random()}`
        img2 = `imgUrl-${random()}`
        quantity2 = Number((random()*100).toFixed())
        price2 = Number((random()*100).toFixed())
        category2 = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')

        await Article.deleteMany()

        const article1 = await Article.create({ ref: ref1, title: title1, description: description1, img: img1, quantity: quantity1, category: category1, price: price1 })
        articleId1 = article1.id

        const article2 = await Article.create({ ref: ref2, title: title2, description: description2, img: img2, quantity: quantity2, category: category2, price: price2 })
        articleId2 = article2.id  
    })
    
    it('should succeed on correct data', async () => {
debugger
        const articles = await retrieveAllArticles()
            
            //USER 1
            expect(articles[0]).to.exist
            expect(articles[0].id.toString()).to.equal(articleId1)
            expect(articles[0].ref).to.equal(ref1)
            expect(articles[0].title).to.equal(title1)
            expect(articles[0].description).to.equal(description1)
            expect(articles[0].img).to.equal(img1)
            expect(articles[0].quantity).to.equal(quantity1)
            expect(articles[0].category).to.equal(category1)
            expect(articles[0].price).to.equal(price1)

            expect(articles[1]).to.exist
            expect(articles[1].id.toString()).to.equal(articleId2)
            expect(articles[1].ref).to.equal(ref2)
            expect(articles[1].title).to.equal(title2)
            expect(articles[1].description).to.equal(description2)
            expect(articles[1].img).to.equal(img2)
            expect(articles[1].quantity).to.equal(quantity2)
            expect(articles[1].category).to.equal(category2)
            expect(articles[1].price).to.equal(price2)

            
        })

       


        after(() => database.disconnect())
})
