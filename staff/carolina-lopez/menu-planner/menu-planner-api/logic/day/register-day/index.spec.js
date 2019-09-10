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

require('dotenv').config()

const { expect } = require('chai')
const registerDay = require('.')
const { database, models: { Recipe, Day }} = require('menu-planner-data')

const { env: { DB_URL_TEST } } = process

describe('logic - register day', () => {
    
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

            // breakfast = id1
            // lunch = id2
            // snack = id3
            // dinner = id4

            // const day = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            // id = day._id.toString()

            //({ breakfast : id1, lunch: id2, snack: id3, dinner: id4})
            //({ breakfast, lunch, snack, dinner })

        })()
    })
               

     it("should succeed on correct data", async () => {

        const idDay = await registerDay(id1, id2, id3, id4)
        
        expect(idDay).to.exist

        const day = await Day.findById(idDay).lean()
        expect(day).to.exist
        debugger
        expect(day.breakfast.toString()).to.equal(id1)
        expect(day.lunch.toString()).to.equal(id2)
        expect(day.snack.toString()).to.equal(id3)
        expect(day.dinner.toString()).to.equal(id4)

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

