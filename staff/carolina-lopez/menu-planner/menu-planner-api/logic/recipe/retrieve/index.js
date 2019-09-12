const { validate } = require('menu-planner-utils')
const { models } = require('menu-planner-data')
const { Recipe } = models
/**
 * Searches the DB a recipe by ID
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/
module.exports = function (id) { 
    
    validate.string(id, 'id')

    return (async () => {
        const recipe = await Recipe.findOne({_id: id}).lean()

        if (!recipe) throw Error(`No recipes found with id ${id}`)

        recipe.id = recipe._id.toString()
        delete recipe._id

        return recipe
    })()
}