require('dotenv').config()

const { expect } = require('chai')
const retrieveAllOrders = require('.')
const { database, models: { Article, User, Order, Item } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retreieve all orders', () => {
    before(() => database.connect(DB_URL_TEST))

    let company, country, email, password, role, userId, orderId
    let quantity = 25
    let date

    beforeEach(async () => {
        
        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = value('admin')

        ref1 = Number((random()*1000).toFixed())
        title1 = `title-${random()}`
        description1 = `description-${random()}`
        img1 = `imgUrl-${random()}`
        quantity1 = Number((random()*100).toFixed())
        price1 = Number((random()*100).toFixed())
        category1 = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')

        ref2 = Number((random()*1000).toFixed())
        title2 = `title-${random()}`
        description2 = `description-${random()}`
        img2 = `imgUrl-${random()}`
        quantity2 = Number((random()*100).toFixed())
        price2 = Number((random()*100).toFixed())
        category2 = value('KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema')

        await User.deleteMany()
        await Article.deleteMany()

        const res = await User.create({ company, country, email, password, role })
        userId = res.id

        const resArticle1 = await Article.create({ ref: ref1, title: title1, description: description1, img: img1, quantity: quantity1, price: price1, category: category1 })
        articleId1 = resArticle1.id

        const resArticle2 = await Article.create({ ref: ref2, title: title2, description: description2, img: img2, quantity: quantity2, price: price2, category: category2 })
        articleId2 = resArticle2.id

        const user = await User.findById(userId)

        if (!user) throw Error(`User with id ${userId} does not exist`)

        let item = user.cart.find(item => item.article.toString() === articleId1)

        item ? item.quantity += quantity : user.cart.push(new Item({article: articleId1, quantity}))

        

        const cart = user.cart

        if(cart.length === 0 ) throw new Error(`Card of user id ${userId} is empty`)

        date = new Date()

        date = date.toString()

        await Order.deleteMany()

        const order = await Order.create({ date, owner: userId, items: user.cart })

        orderId = order.id
        user.cart = undefined
        await user.save()
        
    })

    it('should succeed on correct data', async () => {

        const orders = await retrieveAllOrders(userId)

        const owner = orders[0].owner

        expect(orders).to.exist
        expect(orders[0].id).to.equal(orderId) 
        //expect(orders[0].date).to.equal(date) 
        //expect(owner.toString()).to.equal(userId) 
    })

    it('should fail when userId is empty', async() => {
        try {
            retrieveAllOrders('')            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId is empty or blank`) 
        }
    })

    it('should fail when userId is a number', async() => {
        try {
            retrieveAllOrders(123 )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 123 is not a string`) 
        }
    })

    it('should fail when userId is an object', async() => {
        try {
            retrieveAllOrders({} )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value [object Object] is not a string`) 
        }
    })

    it('should fail when userId is an array', async() => {
        try {
            retrieveAllOrders([1,2,3] )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when userId is a boolean', async() => {
        try {
            retrieveAllOrders(true )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value true is not a string`) 
        }
    })

   

    after(() => database.disconnect())
})

