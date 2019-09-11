const registerWish = require('../../logic/wishes/register-wish')

module.exports = async function (req, res) {
    const { userId, body: { breed, gender, size, age: { years, months }, neutered, withDogs, withCats, withChildren, distance } } = req

    try {
        await registerWish(userId, { breed, gender, size, years, months, neutered, withDogs, withCats, withChildren, distance })
        res.status(201).json({ message: 'wish registered correctly.' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}