const { retrieveCurrentWeek } = require('../../logic')

module.exports = async (req, res) => {

    const { userId } = req

    try { 
        const week = await retrieveCurrentWeek(userId)
            res.json({ message: 'week retrieved correctly', week })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 


