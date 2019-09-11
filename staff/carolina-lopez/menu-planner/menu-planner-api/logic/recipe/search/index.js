const { validate } = require('menu-planner-utils')
const { models } = require('menu-planner-data')
const { Recipe } = models
/**
 * Searches the DB for recipes matching criteria
 * 
 * @param {string} category 
 * 
 * @returns {Promise}
*/
module.exports = function (categorySearch) {
    
    validate.string(categorySearch, 'category')
    return (async () => {
        const recipes = await Recipe.find({category: categorySearch}, { __v: 0 }).lean()
        if (recipes.length === 0) throw Error(`No recipes found for query ${category}`)
        recipes.map(recipe => {
            recipe.id = recipe._id.toString()
            delete recipe._id
        })
        
        return recipes
    })()
}