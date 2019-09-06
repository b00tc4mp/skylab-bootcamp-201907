require('dotenv').config() //nuevo
const { expect } = require('chai')

const register = require('.')
const { database,models:{User, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo


describe('logic - register item', () => {

    before(() => database.connect(DB_URL_TEST)) //nuevo
    
    let name, surname, email, password, userId
    let title,image,description,size,color,price, productId
    let quantity1,itemId
    let date
    

    beforeEach(async() => {

        quantity1 = Number((Math.random()*1000).toFixed())
        date= new Date()

        await Order.deleteMany()
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
            productId = product.id 
            
            const user=await User.create({ name, surname, email, password })
            userId = user.id

            const item=new Item({product:productId,quantity:quantity1})
            itemId=item.id

            items=[itemId]
    })

    it('should succeed on correct data',async () =>{
        
        const result=await register(state,userId,items)
        orderId = result.id
        expect(result).to.exist
        
        const order=await Order.findById(orderId)
        expect(order).to.exist
        expect(order.date).to.equal(date)
        expect(order.owners).to.equal(userId)

    })
/* 
    it('should fail if the item already exists',async () =>{
        const item = new Item({ quantity })
        item.product=id
        await item.save()
        try{
            await register(id, quantity)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Item already exists.')
        }
    })

    it('should fail on empty id', () => 
        expect(() => 
               register("", quantity)
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               register(undefined, quantity)
    ).to.throw(`id with value undefined is not a string`)
    )

  */

    after(() => database.disconnect())
})