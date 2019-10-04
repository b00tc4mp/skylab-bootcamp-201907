import logic from '..'
import { database, models } from 'menu-planner-data'
const { random } = require ('menu-planner-utils')

const { Recipe, Ingredient } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve recipe', () => {
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let id, title, image, items, description, category

    beforeEach(() => {
        return (async () => {
            
            const typeArray = ['breakfast', 'lunch', 'snack', 'dinner']
            //let title, image, description, category

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
            items = []

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
        const recipe = await logic.retrieveRecipe(id)

        expect(recipe.id).toBe(id)
        expect(recipe.image).toBe(image)
        expect(recipe.items[0].ingredient._id.toString()).toBe(items[0].ingredient)
        expect(recipe.items[1].ingredient._id.toString()).toBe(items[1].ingredient)
        expect(recipe.items[2].ingredient._id.toString()).toBe(items[2].ingredient)
        expect(recipe.items[3].ingredient._id.toString()).toBe(items[3].ingredient)
        expect(recipe.description).toBe(description)
        expect(recipe.category).toBe(category)
     })

    it("should fail on non existant id", async () => {
        id = "5d740a810a6041a5ae918901"
        try {
            await logic.retrieveRecipe(id)
        } catch ({ message }) {
            expect(message).toBeDefined()
            expect(message).toBe(`no recipes found with id ${id}`)
        }
    })

    it("should fail if query is not a string", () => {
        expect(() => logic.retrieveRecipe(123)).toThrow(Error, "id with value 123 is not a string")
    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.retrieveRecipe('')
        ).toThrow('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.retrieveRecipe(undefined)
        ).toThrow(`id with value undefined is not a string`)
    )

    afterAll(() => database.disconnect())
})