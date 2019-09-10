require('dotenv').config()

const { expect } = require('chai')
const registerWeek = require('.')
const { database, models: { Recipe, Day, Week }} = require('menu-planner-data')

const { env: { DB_URL_TEST } } = process

describe('logic - register week', () => {
    
    let title1, image1, description1, category1, id1
    let title2, image2, description2, category2, id2
    let title3, image3, description3, category3, id3
    let title4, image4, description4, category4, id4
    // let breakfast, lunch, snack, dinner
    
    before(() => database.connect(DB_URL_TEST))

    beforeEach(() => {
        return (async () => {

            await Recipe.deleteMany()
            await Day.deleteMany()

            // recipe1 - breakfast
            title1 = `title-${Math.random()}`            
            image1 = `image-${Math.random()}`
            description1 = `description-${Math.random()}`
            category1 = 'breakfast'
                    
            let ingredient1, quantity1, itemDescription1
            let items1 = []
                    
    
            for (let i = 0; i < 4; i++) {
                ingredient1 = `322432523645678953748436`
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
                ingredient2 = `322432523645678953748436`
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
                ingredient3 = `322432523645678953748436`
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
                ingredient4 = `322432523645678953748436`
                quantity4 = Number((Math.random() * 1000).toFixed())
                itemDescription4 = `description-${Math.random()}`
    
                items4.push({ ingredient: ingredient4, quantity: quantity4, description: itemDescription4 })
            }

            const recipe4 = await Recipe.create({ title: title4, image: image4, description: description4, category: category4, items: items4 })
            id4 = recipe4._id.toString()
            
            // day 
            const monday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId1 = monday._id.toString()

            const tuesday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId2 = tuesday._id.toString()

            const wednesday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId3 = wednesday._id.toString()

            const thursday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId4 = thursday._id.toString()

            const friday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId5 = friday._id.toString()

            const saturday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId6 = saturday._id.toString()

            const sunday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId7 = sunday._id.toString()

        })()
    })

    it("should succeed on correct data", async () => {

        const weekId = await registerWeek(dayId1, dayId2, dayId3, dayId4, dayId5, dayId6, dayId7)
        
        expect(weekId).to.exist

        const week = await Week.findById(weekId).lean()
        expect(week).to.exist
        expect(week.monday.toString()).to.equal(dayId1)
        expect(week.tuesday.toString()).to.equal(dayId2)
        expect(week.wednesday.toString()).to.equal(dayId3)
        expect(week.thursday.toString()).to.equal(dayId4)
        expect(week.friday.toString()).to.equal(dayId5)
        expect(week.saturday.toString()).to.equal(dayId6)
        expect(week.sunday.toString()).to.equal(dayId7)

    })

    it('should fail on empty day', () => 
        expect(() => 
           registerWeek('', tuesday, wednesday, thursday, friday, saturday, sunday)
    ).to.throw('monday is empty or blank')
    )

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

    //     /* Following 3 tests 
//     for every parameter passed to logic */

//     it('should fail on empty breakfast', () => 
//         expect(() => 
//         registerDay(id, ' ', lunch, snack, dinner)
//     ).to.throw('breakfast is empty or blank')
//     )

//      it('should fail on undefined breakfast', () => 
//         expect(() => 
//         registerDay(id, undefined, lunch, snack, dinner)
//     ).to.throw(`breakfast with value undefined is not a string`)
//     )

//      it('should fail on wrong data type', () => 
//         expect(() => 
//                registerDay(id, 123, lunch, snack, dinner)
//     ).to.throw(`breakfast with value 123 is not a string`)
//     )

//     after(() => database.disconnect())
// })

    after(() => database.disconnect())
})

