const { searchRecipe } = require('../../logic')

module.exports = async (req, res) => {

  const { params :  { category } } = req

  try {
    const recipes = await searchRecipe(category)
      res.status(201).json({ message: 'recipes search correctly', recipes})
  } catch ({ message }) {
    res.status(404).json({ error: message })
  }
}