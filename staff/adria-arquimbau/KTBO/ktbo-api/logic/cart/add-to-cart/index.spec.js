require('dotenv').config()

const { expect } = require('chai')
const addToCard = require('.')
const { database, models: { Article, User, Order, Item } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - add to cart', () => {
    before(() => database.connect(DB_URL_TEST))

    let ref, title, description, img, quantity, category, price, userId, articleId
    let company, country, email, password, role

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
        userId = res.id

        const resArticle = await Article.create({ ref, title, description, img, quantity, price, category })
        articleId = resArticle.id
    })

    it('should succeed on correct data', async () => {

        await addToCard(userId, articleId, quantity)

        const user = await User.findById( userId )
        
        expect(user).to.exist
        expect(user.id).to.equal(userId)
        expect(user.cart[0].article.toString()).to.equal(articleId)
    })

    it('should fail when userId is empty', async() => {
        try {
            addToCard('', articleId, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId is empty or blank`) 
        }
    })

    it('should fail when userId is a number', async() => {
        try {
            addToCard(123, articleId, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 123 is not a string`) 
        }
    })

    it('should fail when userId is an object', async() => {
        try {
            addToCard({}, articleId, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value [object Object] is not a string`) 
        }
    })

    it('should fail when userId is an array', async() => {
        try {
            addToCard([1,2,3], articleId, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when userId is a boolean', async() => {
        try {
            addToCard(true, articleId, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value true is not a string`) 
        }
    })

    it('should fail when articleId is empty', async() => {
        try {
            addToCard(userId, '', quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId is empty or blank`) 
        }
    })

    it('should fail when articleId is a number', async() => {
        try {
            addToCard(userId, 123, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value 123 is not a string`) 
        }
    })

    it('should fail when articleId is an object', async() => {
        try {
            addToCard(userId, {}, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value [object Object] is not a string`) 
        }
    })

    it('should fail when articleId is an array', async() => {
        try {
            addToCard(userId, [1,2,3], quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when articleId is a boolean', async() => {
        try {
            addToCard(userId, true, quantity)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value true is not a string`) 
        }
    })

    it('should fail when quantity is undefined', async() => {
        try {
            addToCard(userId, articleId, '')            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`quantity with value  is not a number`) 
        }
    })

    it('should fail when quantity is a number', async() => {
        try {
            addToCard(userId, articleId, 123)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`quantity with value 123 is not a number`) 
        }
    })

    it('should fail when quantity is an object', async() => {
        try {
            addToCard(userId, articleId, {})            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`quantity with value [object Object] is not a number`) 
        }
    })

    it('should fail when quantity is an array', async() => {
        try {
            addToCard(userId, articleId, [1,2,3])            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`quantity with value 1,2,3 is not a number`) 
        }
    })

    it('should fail when quantity is a boolean', async() => {
        try {
            addToCard(userId, articleId, true)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`quantity with value true is not a number`) 
        }
    })
    

    /* it('should fail if the article already exists', async () => {

        try { 
            await Article.create({ id, ref, title, description, img, quantity, category, price })
        }catch ({ message }){                    
            expect(message).to.equal(`Article already exists`)
        }
    })

    //Following 3 tests 
    //for every parameter passed to logic 

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

 */

    after(() => database.disconnect())
})

