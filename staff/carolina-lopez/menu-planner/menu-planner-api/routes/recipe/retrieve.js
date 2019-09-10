const { retrieveRecipe } = require('../../logic')

module.exports = async (req, res) => {

    const { params: id } = req

    try { 
        const recipe = await retrieveRecipe(id)
            res.json({ message: 'recipe retrieved correctly', recipe })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 
