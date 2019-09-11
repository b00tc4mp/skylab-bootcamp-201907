const search = require('../../logic/dog/search-dogs')

module.exports = async function (req, res) {

    const { body: { breed, gender, size, years, months, neutered, withDogs, withCats, withChildren, location: { coordinates: [longitude, latitude] }, distance } } = req

    try {
        const results = await search({ breed, gender, size, years, months, neutered, withDogs, withCats, withChildren, location: { coordinates: [longitude, latitude] }, distance })
        res.json({ message: 'search undergone successfully', results })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}