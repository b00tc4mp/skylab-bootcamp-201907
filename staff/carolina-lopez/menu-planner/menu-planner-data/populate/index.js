require('dotenv').config()

const { database, models: { Recipe, Item, Ingredient } } = require('..')
const ingredients = require('./ingredients')
const recipes = require('./recipes');

const { env: { DB_URL }} = process;

(async () => {
    await database.connect(DB_URL)

    await Recipe.deleteMany()
    await Ingredient.deleteMany()

    const _ingredients = await Promise.all(ingredients.map(ingredient => 
          Ingredient.create(ingredient)
    ))

    //const _ingredients = await Promise.all(ingredientCreations)

    const recipeCreations = recipes.map(recipe => {
        return (async () => {
           const _recipe = new Recipe()
           _recipe.title = recipe.title
           _recipe.image = recipe.image
           _recipe.items = []
           _recipe.description = recipe.description
           _recipe.category = recipe.category
           
           const { items } = recipe


          items.forEach(item => {
              const { ingredient, quantity, description } = item

              const _ingredient = _ingredients.find(({title}) => {
                return title === ingredient
              })
              
              if(!_ingredient) throw Error(`item not found for ingredient ${ingredient} in recipe ${recipe.title}`)
              
              const _item = new Item()
              _item.ingredient = _ingredient.id
              _item.quantity = quantity
              _item.description = description
              
              _recipe.items.push(_item)
           })

           await _recipe.save()
        })()
    })

    await Promise.all(recipeCreations)

    await database.disconnect()
})()
 

/* const { database, models: { Recipe, Item, Ingredient, Day, Week } } = require('..')
const ingredients = require('./ingredients')
const recipes = require('./recipes')
const days = require('./days');


(async () => {
    await database.connect('mongodb://localhost:27017/menu-planner-api-test')

    await Day.deleteMany()

    //const _ingredients = await Promise.all(ingredientCreations)


          days.forEach(day => { debugger
              const { breakfast, lunch, snack, dinner } = day

              const _breakfast = _breakfast.find(({title}) => {
                return title === breakfast
              })
              
              if(!_breakfast) throw Error(`item not found for breakfast ${breakfast} in recipe ${recipe.title}`)
              
              const _day = new Day()
              _day.breakfast = _breakfast.id
              
        })()


    await Promise.all(recipeCreations)

    await database.disconnect()
  })() */
