const { models: { Day, Recipe } } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')

/**
 * 
 * @param {*} breakfast 
 * @param {*} lunch
 * @param {*} snack
 * @param {*} dinner 
 * @param {*} id 
 * 
 * @returns {Promise}
 */
module.exports = function (/* userId, day ('monday', 'tuesday', 'wednesday', thursday', 'friday', ... ) */ breakfast, lunch, snack, dinner) {

    //VALIDATE TODO STRING

    // TODO find user by id, if not found then error, otherwise proceed
    // TODO check weeks and find matching week with current date (new Date) if no week, then Error, otherwise proceed to create day in that week


    return (async () => {
        const _breakfast = await Recipe.findById(breakfast)
        if (!_breakfast) throw Error(`No recipes found with id ${breakfast}`)

        const _lunch = await Recipes.findById(lunch)
        if (!_lunch) throw Error(`No recipes found with id ${lunch}`)

        const _snack = await Recipes.findById(snack)
        if (!_snack) throw Error(`No recipes found with id ${snack}`)

        const _dinner = await Recipes.findById(dinner)
        if (!_dinner) throw Error(`No recipes found with id ${dinner}`)

        let day = await Day.findOne({ breakfast, lunch, snack, dinner }) // TODO find day in week. it is not an independent collection.

        // TODO week[day] -> undefined, no exisita. week[day] = day

        if (day) throw new Error('day already exists.')

        day = new Day({ breakfast, lunch, snack, dinner })

        await day.save() // user.save()

        return day._id.toString() // should not return
    })()

}    
