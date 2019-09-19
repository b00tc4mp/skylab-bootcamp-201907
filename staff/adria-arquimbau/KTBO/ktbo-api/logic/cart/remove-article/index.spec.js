require('dotenv').config()

const { expect } = require('chai')
const removeArticle = require('.')
const { database, models: { Article, User, Order, Item } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - remove article', () => {
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

        
        const user = await User.findById(userId)

        if (!user) throw Error('TODO')

        let item = user.cart.find(item => item.article.toString() === articleId)

        item ? item.quantity += quantity : user.cart.push(new Item({article: articleId, quantity}))

        await user.save()
        return user.cart
    })

    it('should succeed on correct data', async () => {

        await removeArticle(userId, articleId)

        const user = await User.findById( userId )
        
        expect(user).to.exist
        expect(user.cart.length).to.equal(0)
    })
 
    it('should fail when userId is empty', async() => {
        try {
            removeArticle('', articleId)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId is empty or blank`) 
        }
    })

    it('should fail when userId is a number', async() => {
        try {
            removeArticle(123, articleId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 123 is not a string`) 
        }
    })

    it('should fail when userId is an object', async() => {
        try {
            removeArticle({}, articleId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value [object Object] is not a string`) 
        }
    })

    it('should fail when userId is an array', async() => {
        try {
            removeArticle([1,2,3], articleId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when userId is a boolean', async() => {
        try {
            removeArticle(true, articleId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value true is not a string`) 
        }
    })

    it('should fail when articleId is empty', async() => {
        try {
            removeArticle(userId, '' )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId is empty or blank`) 
        }
    })

    it('should fail when articleId is a number', async() => {
        try {
            removeArticle(userId, 123 )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value 123 is not a string`) 
        }
    })

    it('should fail when articleId is an object', async() => {
        try {
            removeArticle(userId, {} )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value [object Object] is not a string`) 
        }
    })

    it('should fail when articleId is an array', async() => {
        try {
            removeArticle(userId, [1,2,3] )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when articleId is a boolean', async() => {
        try {
            removeArticle(userId, true )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`articleId with value true is not a string`) 
        }
    })

    after(() => database.disconnect())
})