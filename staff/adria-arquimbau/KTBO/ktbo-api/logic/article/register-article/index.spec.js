require('dotenv').config()

const { expect } = require('chai')
const registerArticle = require('.')
const { database, models: { Article, User } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - register article', () => {
    before(() => database.connect(DB_URL_TEST))

    let id, ref, title, description, img, quantity, category, price

    beforeEach(async () => {
      
        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = value('admin')

        ref = Number((random()*1000).toFixed())
        title = `title-${random()}`
        description = `description-${random()}`
        img = `imgUrl-${random()}`
        quantity = Number((random()*100).toFixed())
        price = Number((random()*100).toFixed())
        category = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')

        await User.deleteMany()
        await Article.deleteMany()

        const res = await User.create({ company, country, email, password, role })
        id = res.id
    })

    it('should succeed on correct data', async () => {
        const result = await registerArticle(id, ref, title, description, img, quantity, category, price)
        
        articleId = result
        expect(articleId).to.exist
        
        const article = await Article.findOne({ ref })
            
        expect(article).to.exist
        expect(article.ref).to.equal(ref)
        expect(article.title).to.equal(title)
        expect(article.description).to.equal(description)
        expect(article.img).to.equal(img)
        expect(article.quantity).to.equal(quantity)
        expect(article.category).to.equal(category)
        expect(article.price).to.equal(price)
        expect(id).to.exist
    })

    it('should fail if the article already exists', async () => {

        try {
            await Article.create({ id, ref, title, description, img, quantity, category, price })
        }catch ({ message }){                    
            expect(message).to.equal(`Article already exists`)
        }
    })

    /* Following 3 tests 
    for every parameter passed to logic */

     it('should fail on undefined ref', () => //no es async
        expect(() => 
               registerArticle(id, undefined, title, description, img, quantity, category)
    ).to.throw(`ref with value undefined is not a number`)
    )

     it('should fail on wrong ref type', () => 
        expect(() => 
               registerArticle(id, 'abc', title, description, img, quantity, category)
    ).to.throw(`ref with value abc is not a number`)
    )

    it('should fail if user is not an admin', async () => {

        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = value('regular')

        await User.deleteMany()

        try {
            const res = await User.create({ company, country, email, password, role })
            id = res.id
        }catch ({ message }){                    
            expect(message).to.equal(`User with id ${id} is not an admin`)
        }
    })



    after(() => database.disconnect())
})

