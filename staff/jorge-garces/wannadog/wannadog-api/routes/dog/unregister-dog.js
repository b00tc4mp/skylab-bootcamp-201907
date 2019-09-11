const unregisterDog = require('../../logic/dog/unregister-dog')

module.exports = async function (req, res) {


    const { userId, params: { dogId }, body: { email, password } } = req

    try {
        debugger
        await unregisterDog(userId, email, password, dogId)
        res.json({ message: 'dog unregistered successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}