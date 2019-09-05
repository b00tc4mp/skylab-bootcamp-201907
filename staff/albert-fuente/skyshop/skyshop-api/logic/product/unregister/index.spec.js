const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { Product } = require('../../../models')

describe('logic - delete product', () => {
    
    let title,image,description,size,color, price, id, productId

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    beforeEach(async() => {

                title = `title-${Math.random()}`
                image = `image-${Math.random()}`
                description = `description-${Math.random()}`
                size = [`l`]
                color = `color-${Math.random()}`
                price = Math.random()

        await Product.deleteMany()

                const product=await new Product({title,image,description,size,color, price})
                productId=product.id 
                return await product.save() //retornes l'usuari guardat
                     
    })

    it('should succeed on correct data',async () =>{        
        const productResult=await logic.product.unregister(productId)   
                             
                expect(productResult).not.to.exist
            }
    
        
    )

        it('should fail if there is no product',async () =>{
        let x= '5d5d5530531d455f75da9fF9'
        try{
            logic.product.unregister( x)


        }catch(error){
            expect(error).to.exist
                expect(error.message).to.equal(`Product with id ${x} does not exist.`)
        }
    }) 
    after(() => mongoose.disconnect())
})

