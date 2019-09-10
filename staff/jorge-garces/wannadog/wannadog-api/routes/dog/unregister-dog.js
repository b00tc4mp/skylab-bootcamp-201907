const unregisterDog = require('../../logic/dog/unregister-dog')

module.exports = async function (req, res) {


    const { params: { id, dogId }, body: { email, password } } = req

    try {
        debugger
        await unregisterDog(id, email, password, dogId)
        res.json({ message: 'dog unregistered successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}