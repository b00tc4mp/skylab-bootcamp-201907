const registerDog = require('../../logic/dog/register-dog')

module.exports = async function (req, res) {
    const { userId, body: { name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, location: { coordinates: [longitude = 0, latitude = 0] }, chip } } = req

    try {
        const dogId = await registerDog(userId, { name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, longitude, latitude, chip })
        res.status(201).json({ message: 'Dog registered correctly.', dogId })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}