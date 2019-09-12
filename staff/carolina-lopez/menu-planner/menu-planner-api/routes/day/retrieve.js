const { retrieveCurrentDay } = require('../../logic')

module.exports = async (req, res) => {

    const { userId , params: { id }  } = req

    try { 
        day = id
        const day = await retrieveCurrentDay(userId)
        res.json({ message: 'day retrieved correctly', day })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

}


