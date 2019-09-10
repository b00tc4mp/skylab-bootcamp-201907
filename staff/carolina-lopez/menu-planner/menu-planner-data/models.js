const mongoose = require('mongoose')
const { user, ingredient, item, recipe, day, week } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Ingredient: mongoose.model('Ingredient', ingredient),
    Item: mongoose.model('Item', item),
    Recipe: mongoose.model('Recipe', recipe),
    Day: mongoose.model('Day', day),
    Week: mongoose.model('Week', week)
}