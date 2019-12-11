require('dotenv').config()

const { expect } = require('chai')
const retrieveOrder = require('.')
const { database, models: { Article, User, Order, Item } } = require('ktbo-data')
const { random: { value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve order', () => {
    before(() => database.connect(DB_URL_TEST))

    let company, country, email, password, role, userId, orderId

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

        if (!user) throw Error(`User with id ${id} does not exist`)

        let item = user.cart.find(item => item.article.toString() === articleId)

        item ? item.quantity += quantity : user.cart.push(new Item({article: articleId, quantity}))

        await user.save()

        const cart = user.cart

        if(cart.length === 0 ) throw new Error(`Card of user id ${userId} is empty`)

        let date = new Date()

        date = date.toString()

        await Order.deleteMany()

        const order = await Order.create({ date, owner: userId, items: user.cart })

        orderId = order.id
        user.cart = undefined
        user.save()
        //return order

    })

    it('should succeed on correct data', async () => {
        
        await retrieveOrder(userId, orderId)

        const order = await Order.find({_id: orderId})
        

        expect(order).to.exist
        expect(order[0].owner.toString()).to.equal(userId)
        expect(order[0].state).to.equal('pending')
        expect(order[0].items.length).to.equal(1)
    })

    it('should fail when userId is empty', async() => {
        try {
            retrieveOrder('', orderId)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId is empty or blank`) 
        }
    })

    it('should fail when userId is a number', async() => {
        try {
            retrieveOrder(123, orderId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 123 is not a string`) 
        }
    })

    it('should fail when userId is an object', async() => {
        try {
            retrieveOrder({}, orderId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value [object Object] is not a string`) 
        }
    })

    it('should fail when userId is an array', async() => {
        try {
            retrieveOrder([1,2,3], orderId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when userId is a boolean', async() => {
        try {
            retrieveOrder(true, orderId )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value true is not a string`) 
        }
    })

    it('should fail when orderId is empty', async() => {
        try {
            retrieveOrder(userId, '')            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`orderId is empty or blank`) 
        }
    })

    it('should fail when orderId is a number', async() => {
        try {
            retrieveOrder(userId, 123 )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`orderId with value 123 is not a string`) 
        }
    })

    it('should fail when orderId is an object', async() => {
        try {
            retrieveOrder(userId, {} )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`orderId with value [object Object] is not a string`) 
        }
    })

    it('should fail when orderId is an array', async() => {
        try {
            retrieveOrder( userId, [1,2,3] )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`orderId with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when orderId is a boolean', async() => {
        try {
            retrieveOrder( userId, true )            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`orderId with value true is not a string`) 
        }
    })

    after(() => database.disconnect())
})

