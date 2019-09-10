const registerDog = require('../../logic/dog/register-dog')

module.exports = async function (req, res) {
    const { userId, body: { name, breed, gender, size, age: { years, months }, notes, neutered, withDogs, withCats, withChildren, chip, location: { coordinates: [longitude = 0, latitude = 0] } } } = req

    try {
        await registerDog(userId, name, breed, gender, size, years, months, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude)
        res.status(201).json({ message: 'Dog registered correctly.' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}