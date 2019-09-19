import logic from '..'
import { database, models } from 'menu-planner-data'
import bcrypt from 'bcryptjs'
// import moment from 'momentjs'

const { Recipe, Day, Week, Ingredient, User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

// const { random } = Math

describe('logic - register day', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let currentWeek, currentWeekMondayDate, userId
    let id1, id2, id3, id4

    beforeEach(async () => {
        let title1, image1, description1, category1
        let title2, image2, description2, category2
        let title3, image3, description3, category3
        let title4, image4, description4, category4

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

        // day 
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
        currentWeek = new Week({ date: currentWeekMondayDate = new Date(year, month, day), monday, tuesday, wednesday, thursday, friday, saturday, saturday, sunday })
        const pastWeek1 = new Week({ date: new Date(year - 1, month, day) })
        const pastWeek2 = new Week({ date: new Date(year - 2, month, day) })
        const pastWeek3 = new Week({ date: new Date(year - 3, month, day) })
        const pastWeek4 = new Week({ date: new Date(year - 4, month, day) })

        const name = `name-${Math.random()}`
        const surname = `surname-${Math.random()}`
        const email = `email-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        await User.deleteMany()
        

        const { id } = await User.create({ name, surname, email, password, weeks: [currentWeek, pastWeek1, pastWeek2, pastWeek3, pastWeek4] })
        userId = id
    })

    it("should succeed on correct data", async () => { 
        
        const _day = random.value('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')

        const res = await logic.registerDay(userId, _day, id4, id3, id2, id1)

        expect(res).toBeUndefined()

        const user = await User.findById(userId)

        const { weeks } = user

        const week = weeks.find(week => moment(week.date).isSame(currentWeekMondayDate))

        const day = week[_day]

        expect(day.breakfast.toString()).toBe(id4)
        expect(day.lunch.toString()).toBe(id3)
        expect(day.snack.toString()).toBe(id2)
        expect(day.dinner.toString()).toBe(id1)
    })

    it("should fail on non existant id", async () => {
      id1 = "5d740a810a6041a5ae918901"
      const _day = random.value('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')

      try {
        await logic.registerDay(userId, _day, id4, id3, id2, id1)
      } catch({message}) {
        expect(message).toBe()
        expect(message).toBe(`recipe with id ${id1} not found`)
      }
    })

    it("should fail if query is not a string", () => {
        const _day = random.value('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')

         expect(() => logic.registerDay(123, _day, id4, id3, id2, id1 )).toThrow(Error, "userId with value 123 is not a string")
    })

    it('should fail on empty id', () => {
        const _day = random.value('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
        
        expect(() => 
            logic.registerDay('', _day, id4, id3, id2, id1)
        ).toThrow('userId is empty or blank')
    })

    it('should fail on undefined id', () => {
        const _day = random.value('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')

        expect(() => 
            logic.registerDay(undefined, _day, id4, id3, id2, id1)
        ).toThrow(`userId with value undefined is not a string`)
    })

    afterAll(() => database.disconnect())
})