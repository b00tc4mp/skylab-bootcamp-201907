require('dotenv').config()

const { expect } = require('chai')
const placeOrder = require('.')
const { database, models: { Article, User, Order, Item } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - place order', () => {
    before(() => database.connect(DB_URL_TEST))

    let company, country, email, password, role, userId

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
        stockQuantity = 50//Number((random()*100).toFixed())
        price = Number((random()*100).toFixed())
        category = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')

        await User.deleteMany()
        await Article.deleteMany()

        const res = await User.create({ company, country, email, password, role })
        userId = res.id

        const resArticle = await Article.create({ ref, title, description, img, quantity: stockQuantity, price, category })
        articleId = resArticle.id

        const quantity = 25
        const user = await User.findById(userId)

        if (!user) throw Error(`User with id ${userId} does not exist`)

        let item = user.cart.find(item => item.article.toString() === articleId)

        item ? item.quantity += quantity : user.cart.push(new Item({article: articleId, quantity}))

        await user.save()
        return user.cart

    })

    it('should succeed on correct data', async () => {

        await placeOrder(userId)

        const order = await Order.find({ owner: userId })
        
        expect(order[0].owner.toString()).to.equal(userId)
        expect(order[0].state).to.equal('pending')
        //expect(order[0].owner.toString()).to.equal(userId)
        expect(order[0].items.length).to.equal(1)

        const user = await User.find({userId})

        expect(user).to.exist
        expect(user.cart).to.not.exist

        const article = await Article.findById(articleId)

        finalQty = stockQuantity - quantity

        //expect(article.quantity).to.equal(finalQty)
    })

    it('should fail when userId is empty', async() => {
        try {
            placeOrder('')            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId is empty or blank`) 
        }
    })

    it('should fail when userId is a number', async() => {
        try {
            placeOrder(123 )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 123 is not a string`) 
        }
    })

    it('should fail when userId is an object', async() => {
        try {
            placeOrder({} )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value [object Object] is not a string`) 
        }
    })

    it('should fail when userId is an array', async() => {
        try {
            placeOrder([1,2,3] )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when userId is a boolean', async() => {
        try {
            placeOrder(true )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value true is not a string`) 
        }
    })
    after(() => database.disconnect())
})

