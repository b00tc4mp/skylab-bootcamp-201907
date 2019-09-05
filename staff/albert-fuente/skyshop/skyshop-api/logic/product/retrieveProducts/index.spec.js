const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { Product } = require('../../../models')

describe('logic - retrieve products', () => {
    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))
    let userId
    let title,image,description,size,color, price

    beforeEach(() => {

        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        description = `description-${Math.random()}`
        size = [`l`]
        color = `color-${Math.random()}`
        price = Math.random()

        return (async () => {
            await Product.deleteMany()
            let newProduct = new Product({ title,image,description,size,color, price })
            productId = newProduct.id
            await newProduct.save()
        })()
    })
    it('should succeed on correct data', async () => {
        const product = await logic.product.retrieveProducts( title)
        expect(product).to.exist
        expect(product[0].title).to.equal(title)
        expect(product[0].image).to.deep.equal(image)
        expect(product[0].size).to.deep.equal(size)

    }
    )

    it('should fail if product does not exist', async () => {

        try {
            await logic.product.retrieveProducts("xxx")
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Card with id ${title} does not exist.`)
        }
    })
    
    it('should fail on empty Product ID', () =>
        expect(() =>
            logic.product.retrieveProducts( '')
        ).to.throw('query is empty or blank')
    )
    it('should fail on undefined Product ID', () =>
        expect(() =>
            logic.product.retrieveProducts( undefined)
        ).to.throw(`query with value undefined is not a string`)
    )
    it('should fail on wrong data type for Product ID', () =>
        expect(() =>
            logic.product.retrieveProducts( 123)
        ).to.throw(`query with value 123 is not a string`)
    )
})