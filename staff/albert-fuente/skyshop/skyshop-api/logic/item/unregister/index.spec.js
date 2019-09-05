const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { Item, Product } = require('../../../models')

describe.only('logic - unregister item', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let id, itemId

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
        const result= await logic.item.unregister(id)
        debugger
        
                expect(result).not.to.exist
    })

    /* it('should fail if the item does not exists',async () =>{
        
        try{
            await logic.item.unregister('35432535525')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Item already exists.')
        }
    }) */

    it('should fail on empty id', () => 
        expect(() => 
               logic.item.unregister("")
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.item.unregister(undefined)
    ).to.throw(`id with value undefined is not a string`)
    )

 

    after(() => mongoose.disconnect())
})