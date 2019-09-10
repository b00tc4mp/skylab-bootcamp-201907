require('dotenv').config()

const { expect } = require('chai')
const searchRecipe = require('.')
const { database, models: { Recipe }} = require('menu-planner-data')

const { env: { DB_URL_TEST } } = process

describe('logic - search recipe', () => {

    const typeArray = ['breakfast', 'lunch', 'snack', 'dinner']
    let title, image, description, category

    before(() => database.connect(DB_URL_TEST))

    beforeEach(() => {

        return (async () => {

            await Recipe.deleteMany()

            for (let x = 0; x < 50; x++) {

                title = `title-${Math.random()}`
                image = `image-${Math.random()}`
                description = `description-${Math.random()}`
                category = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`

                let ingredient, quantity, itemDescription
                let items = []

                for (let i = 0; i < 4; i++) {
                    ingredient = `322432523645678953748436`
                    quantity = Number((Math.random() * 1000).toFixed())
                    itemDescription = `description-${Math.random()}`

                    items.push({ ingredient, quantity, description: itemDescription })
                }

                await Recipe.create({ title, image, description, category, items })
            }
        })()
    })

    it("should return a list of recipes on correct data", async () => {

        const result = await searchRecipe(category)
        expect(result).to.exist
        expect(result[0].category).to.equal(category)
    })

    it("should fail on incorrect data", async () => {
        category = "mueh"
        try {
            await searchRecipe(category)
        } catch({ message }) {
            expect(message).to.exist
            expect(message).to.equal(`No recipes found for query ${category}`)
        }
    })

    it("should fail if query is not a string", () => {
         expect(() => searchRecipe(123)).to.throw(Error, "category with value 123 is not a string")
    })

    it('should fail on empty category', () => 
        expect(() => 
            searchRecipe('')
        ).to.throw('category is empty or blank')
    )

    it('should fail on undefined category', () => 
        expect(() => 
            searchRecipe(undefined)
        ).to.throw(`category with value undefined is not a string`)
    )

    after(() => database.disconnect())
})