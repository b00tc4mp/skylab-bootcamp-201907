require('dotenv').config()

const { expect } = require('chai')
const retrieveCurrentDay = require('.')
const { database, models: { Recipe, Day, Week, Ingredient, User } } = require('menu-planner-data')
const { random } = require('menu-planner-utils')
const moment = require('moment')

const { env: { DB_URL_TEST } } = process

describe('logic - retrieve day', () => {

    before(() => database.connect(DB_URL_TEST))

    let week, userId, id1, id2, id3, id4

    beforeEach(() => {
        return (async () => {
            await User.deleteMany()
            await Ingredient.deleteMany()

            //Ingredients and Recipe creation
            const ingredientIds = []
            let title1, image1, description1, category1
            let title2, image2, description2, category2
            let title3, image3, description3, category3
            let title4, image4, description4, category4

            for (let i = 0; i < 10; i++) {
                const ingredient = {
                    title: `title-${Math.random()}`,
                    unit: `units-${Math.random()}`
                }

                const { id } = await Ingredient.create(ingredient)

                ingredientIds.push(id)
            }

            await Recipe.deleteMany()

            // recipe1 - breakfast
            title1 = `title-${Math.random()}`
            image1 = `image-${Math.random()}`
            description1 = `description-${Math.random()}`
            category1 = 'breakfast'

            let ingredient1, quantity1, itemDescription1
            let items1 = []


            for (let i = 0; i < 4; i++) {
                ingredient1 = random.value(...ingredientIds)
                quantity1 = Number((Math.random() * 1000).toFixed())
                itemDescription1 = `description-${Math.random()}`

                items1.push({ ingredient: ingredient1, quantity: quantity1, description: itemDescription1 })
            }

            const recipe1 = await Recipe.create({ title: title1, image: image1, description: description1, category: category1, items: items1 })
            id1 = recipe1._id.toString()

            // recipe2 - lunch
            title2 = `title-${Math.random()}`
            image2 = `image-${Math.random()}`
            description2 = `description-${Math.random()}`
            category2 = 'lunch'

            let ingredient2, quantity2, itemDescription2
            let items2 = []


            for (let i = 0; i < 4; i++) {
                ingredient2 = random.value(...ingredientIds)
                quantity2 = Number((Math.random() * 1000).toFixed())
                itemDescription2 = `description-${Math.random()}`

                items2.push({ ingredient: ingredient2, quantity: quantity2, description: itemDescription2 })
            }

            const recipe2 = await Recipe.create({ title: title2, image: image2, description: description2, category: category2, items: items2 })
            id2 = recipe2._id.toString()

            // recipe3 - snack
            title3 = `title-${Math.random()}`
            image3 = `image-${Math.random()}`
            description3 = `description-${Math.random()}`
            category3 = 'snack'

            let ingredient3, quantity3, itemDescription3
            let items3 = []


            for (let i = 0; i < 4; i++) {
                ingredient3 = random.value(...ingredientIds)
                quantity3 = Number((Math.random() * 1000).toFixed())
                itemDescription3 = `description-${Math.random()}`

                items3.push({ ingredient: ingredient3, quantity: quantity3, description: itemDescription3 })
            }

            const recipe3 = await Recipe.create({ title: title3, image: image3, description: description3, category: category3, items: items3 })
            id3 = recipe3._id.toString()

            // recipe4 - dinner
            title4 = `title-${Math.random()}`
            image4 = `image-${Math.random()}`
            description4 = `description-${Math.random()}`
            category4 = 'dinner'

            let ingredient4, quantity4, itemDescription4
            let items4 = []


            for (let i = 0; i < 4; i++) {
                ingredient4 = random.value(...ingredientIds)
                quantity4 = Number((Math.random() * 1000).toFixed())
                itemDescription4 = `description-${Math.random()}`

                items4.push({ ingredient: ingredient4, quantity: quantity4, description: itemDescription4 })
            }

            const recipe4 = await Recipe.create({ title: title4, image: image4, description: description4, category: category4, items: items4 })
            id4 = recipe4._id.toString()

            // Creation of Days 
            const monday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const tuesday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const wednesday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const thursday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const friday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const saturday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const sunday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            // calculate current week monday exact date
            const day = moment().date() - moment().day() + 1,
                month = moment().month(),
                year = moment().year()

            // week
            week = new Week({ date: new Date(year, month, day), monday, tuesday, wednesday, thursday, friday, saturday, sunday })

            //user creation
            const name = `name-${Math.random()}`
            const surname = `surname-${Math.random()}`
            const email = `email-${Math.random()}@mail.com`
            const password = `password-${Math.random()}`

            const { id } = await User.create({ name, surname, email, password, weeks: [week] })
            userId = id
        })()
    
    })

    it("should retrieve a day on correct data", async () => { 
        const day = await retrieveCurrentDay(userId)

        expect(day).to.exist
        
        expect(day.breakfast.id.toString()).to.equal(id1)
        expect(day.lunch.id.toString()).to.equal(id2)
        expect(day.snack.id.toString()).to.equal(id3)
        expect(day.dinner.id.toString()).to.equal(id4)
    })

    // it("should fail on non existant id", async () => {
    //   id = "5d740a810a6041a5ae918901"
    //   try {
    //     await retrieveRecipe(id)
    //   } catch({message}) {
    //     expect(message).to.exist
    //     expect(message).to.equal(`No recipes found with id ${id}`)
    //   }
    // })

    // it("should fail if query is not a string", () => {
    //      expect(() => retrieveRecipe(123)).to.throw(Error, "id with value 123 is not a string")
    // })

    // it('should fail on empty id', () => 
    //     expect(() => 
    //         retrieveRecipe('')
    //     ).to.throw('id is empty or blank')
    // )

    // it('should fail on undefined id', () => 
    //     expect(() => 
    //         retrieveRecipe(undefined)
    //     ).to.throw(`id with value undefined is not a string`)
    // )

    after(() => database.disconnect())
})
