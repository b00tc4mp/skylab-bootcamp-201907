require('dotenv').config()

const { expect } = require('chai')
const searchRecipe = require('.')
const { database, models: { Recipe, Ingredient }} = require('menu-planner-data')
const { random } = require('menu-planner-utils')

const { env: { DB_URL_TEST } } = process

describe('logic - search recipe', () => {

    let title
    
    before(() => database.connect(DB_URL_TEST))
    
    beforeEach(() => {
        
        return (async () => {
            
            const typeArray = ['breakfast', 'lunch', 'snack', 'dinner']
            let title, image, description, category

            await Ingredient.deleteMany()

            const ingredientIds = []

            for (let i = 0; i < 10; i++) {
                const ingredient = {
                    title: `title-${Math.random()}`,
                    unit: `units-${Math.random()}`
                }

                const { id } = await Ingredient.create(ingredient)

                ingredientIds.push(id)
            }
           
            await Recipe.deleteMany()

            for (let x = 0; x < 10; x++) {

                title = `title-${Math.random()}`
                image = `image-${Math.random()}`
                description = `description-${Math.random()}`
                category = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`

                let ingredient, quantity, itemDescription
                let items = []

                for (let i = 0; i < 4; i++) {
                    ingredient = random.value(...ingredientIds)
                    quantity = Number((Math.random() * 1000).toFixed())
                    itemDescription = `description-${Math.random()}`

                    items.push({ ingredient, quantity, description: itemDescription })
                }

                const recipe = await Recipe.create({ title, image, description, category, items })
                id = recipe._id.toString()
            }
        })()
    })

    it("should return a list of recipes on correct data", async () => {  debugger
        const categorySearch = 'breakfast'
        const results = await searchRecipe(categorySearch)

        expect(results).to.exist
        results.forEach( result => {
            expect(result.category).to.equal(categorySearch)
            expect(result.title).to.exist
            expect(result.image).to.exist
            expect(result.description).to.exist
            expect(result.items).to.exist
        })
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