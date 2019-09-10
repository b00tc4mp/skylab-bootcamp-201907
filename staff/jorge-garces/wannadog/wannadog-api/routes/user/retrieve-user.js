const retrieveUser = require('../../logic/user/retrieve-user')

module.exports = async function (req, res) {

    const { params: { id } } = req

    try {
        const user = await retrieveUser(id)
        res.json({ message: 'user retrieved correctly', user })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}