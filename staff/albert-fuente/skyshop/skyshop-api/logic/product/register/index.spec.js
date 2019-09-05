const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Product } = require('../../../models')

describe('logic - register product', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let title,image,description,size,color, price, productId

    beforeEach(async() => {

        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        description = `description-${Math.random()}`
        size = [ 's' ]
        color = `color-${Math.random()}`
        price = Math.random()

        await Product.deleteMany() 
    })

    it('should succeed on correct data', async() =>{
        
        let result= await logic.product.register(title,image,description,size,color,price)
                
                productId = result
                expect(productId).to.exist
                
                const product=await Product.findOne({ _id:productId })
                
          
                expect(product).to.exist
                expect(product.title).to.equal(title)
                expect(product.image).to.equal(image)
                expect(product.description).to.equal(description)
/*                 expect(product.size).to.equal(size)
 */                expect(product.color).to.equal(color)
                expect(product.price).to.equal(price)
        }
    
        
    )

   /*  it('should succeed on correct data', async() =>{
        
        logic.card.register(id, number,expiry)
            .then(result => {
                cardId = result
                expect(cardId).to.exist
                
                return Card.findOne({ cardId })
                
            })
            .then(card => {
                
                expect(card).to.exist
                expect(card.number).to.equal(number)
                expect(card.expiry).to.equal(expiry)
            })}
    
        
    ) */

    /* it('should fail if the card already exists', () =>
       Card.create({ number,expiry })
           .then (() => logic.card.register(id, number,expiry)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Card already exists.`)
               })
           )
    )

     it('should fail on empty number', () => 
        expect(() => 
               logic.card.register(id, '', expiry)
    ).to.throw('number is empty or blank')
    )

     it('should fail on undefined number', () => 
        expect(() => 
               logic.card.register(id, undefined, expiry)
    ).to.throw(`number with value undefined is not a string`)
    )

     it('should fail on empty expiry', () => 
        expect(() => 
               logic.card.register(id, number, "")
    ).to.throw(`expiry date with value  is not a valid date`)
    ) */

    after(() => mongoose.disconnect())
})


/* number = `1-${Math.random()}`
            expiry = `"0"+${Math.floor(Math.random() * 9)}/"0"+${Math.floor(Math.random() * 9)}`
             */