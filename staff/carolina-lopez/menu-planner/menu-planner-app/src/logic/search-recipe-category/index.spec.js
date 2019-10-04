import logic from '..'
import { database, models } from 'menu-planner-data'
import moment from 'moment'
import jwt from 'jsonwebtoken'
const { random } = require ('menu-planner-utils')

const { Recipe, Ingredient } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - search recipe', () => {

    let category, id
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
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

    it("should return a list of recipes on correct data", async () => {  
        const categorySearch = 'breakfast'
        const results = await logic.searchRecipe(categorySearch)

        expect(results).toBeDefined
        results.forEach( result => {
            expect(result.category).toBe(categorySearch)
            expect(result.title).toBeDefined
            expect(result.image).toBeDefined
            expect(result.description).toBeDefined
            expect(result.items).toBeDefined
        })
    })

    // it("should fail on incorrect data", async () => {
    //     categorySearch = "mueh"
    //     try {
    //         await searchRecipe(categorySearch)
    //     } catch({ message }) {
    //         expect(message).to.exist
    //         expect(message).to.equal(`No recipes found for query ${categorySearch}`)
    //     }
    // })

    it("should fail if query is not a string", () => {
         expect(() => logic.searchRecipe(123)).toThrow(Error, "category with value 123 is not a string")
    })

    it('should fail on empty category', () => 
        expect(() => 
            logic.searchRecipe('')
        ).toThrow('category is empty or blank')
    )

    it('should fail on undefined category', () => 
        expect(() => 
            logic.searchRecipe(undefined)
        ).toThrow(`category with value undefined is not a string`)
    )

    afterAll(() => database.disconnect())
})