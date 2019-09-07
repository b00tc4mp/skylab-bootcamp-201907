require('dotenv').config() 
const { expect } = require('chai')

const placeOrder = require('.')
const { database,models:{User, Product, Item} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process 


describe('logic - place order', () => {

    before(() => database.connect(DB_URL_TEST)) 
    
    let name, surname, email, password, userId
    let title,image,description,size,color,price, productId
    let quantity,itemId
    let orderId
    

    beforeEach(async() => {

        quantity = Number((Math.random()*1000).toFixed())
        date= new Date()

        await User.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            
            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
            description = `description-${Math.random()}`
            size = [ 's' ]
            color = `color-${Math.random()}`
            price = Math.random()

            const product=await Product.create({ title,image,description,size,color,price })
            productId = product.id.toString()
            debugger
            const user=await User.create({ name, surname, email, password })
            userId = user.id
            debugger
            const item=await Item.create({product:productId, quantity})
            itemId=item.id
            debugger
            user.cart.push(item)
            debugger
         
    })

     it('should succeed on correct data',async () =>{
        debugger
        const result=await placeOrder(userId)
        orderId=result.id
        expect(result).to.exist

        const order=await Order.findById(orderId)
        expect(order).to.exist
        expect(user.cart).to.exist
        expect(user.cart[0].quantity).to.equal(quantity)
    }) 

    it('should fail on empty cart',async () =>{
        try{
            await placeOrder(userId)

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Cart is empty')

        }
    }) 

    it('should fail on empty cart',async () =>{
        try{
            await placeOrder('15985d5fe532b4f3f827e6fc64f87104')
            
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('User with id 5d5fe532b4f3f827e6fc64f8 does not exist')
        }
    }) 

    it('should fail on empty userId', () =>
    expect(() =>
        placeOrder('')
    ).to.throw('userId is empty or blank')
    )

    it('should fail on undefined userId', () =>
    expect(() =>
        placeOrder(undefined)
    ).to.throw(`userId with value undefined is not a string`)
    )

    it('should fail on wrong data type for userId', () =>
    expect(() =>
        placeOrder(123)
    ).to.throw(`userId with value 123 is not a string`)
    )

    after(() => database.disconnect())
})