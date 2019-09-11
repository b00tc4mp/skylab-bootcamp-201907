require('dotenv').config()

const { expect } = require('chai')
const retrieveRecipe = require('.')
const { database, models: { Recipe, Ingredient }} = require('menu-planner-data')
const { random } = require('menu-planner-utils')

const { env: { DB_URL_TEST } } = process

describe.only('logic - retrieve recipe', () => {

    
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
        })()
    })

    it("should retrieve a recipe on correct data", async () => {

        const recipe = await retrieveRecipe(id)
        expect(recipe).to.exist
        expect(recipe.id).to.equal(id)
    })

    it("should fail on non existant id", async () => {
      id = "5d740a810a6041a5ae918901"
      try {
        await retrieveRecipe(id)
      } catch({message}) {
        expect(message).to.exist
        expect(message).to.equal(`No recipes found with id ${id}`)
      }
    })

    it("should fail if query is not a string", () => {
         expect(() => retrieveRecipe(123)).to.throw(Error, "id with value 123 is not a string")
    })

    it('should fail on empty id', () => 
        expect(() => 
            retrieveRecipe('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () => 
        expect(() => 
            retrieveRecipe(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    after(() => database.disconnect())
})