require('dotenv').config() //nuevo
const { expect } = require('chai')

const register = require('.')
const { database,models:{Item, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo


describe('logic - register item', () => {

    before(() => database.connect(DB_URL_TEST)) //nuevo

    let id, quantity, itemId

    beforeEach(async() => {

        quantity = Number((Math.random()*1000).toFixed())

        await Item.deleteMany()
            
            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
            description = `description-${Math.random()}`
            size = [ 's' ]
            color = `color-${Math.random()}`
            price = Math.random()

            const product=await Product.create({ title,image,description,size,color,price })
            id = product._id.toString()   
    })

    it('should succeed on correct data',async () =>{
        const result= await register(id, quantity)
        debugger
        
                itemId = result
                expect(itemId).to.exist
                const item= await Item.findById(itemId)
           
                expect(item).to.exist
                expect(item.id).to.equal(itemId)
                expect(item.quantity).to.equal(quantity)
    })

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

 

    after(() => database.disconnect())
})