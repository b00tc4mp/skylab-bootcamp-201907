const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Dog } = models

/**
 * Registers a new dog
 * 
 * @param {string} name 
 * @param {string} breed 
 * @param {boolean} gender 
 * @param {string} size 
 * @param {date} age 
 * @param {string} notes 
 * @param {boolean} neutered 
 * @param {boolean} withDogs
 * @param {boolean} withCats
 * @param {boolean} withChildren
 * @param {string} chip
 * @param {number} longitude
 * @param {number} latitude
 * 
 * @returns {Promise}
 */

module.exports = function (id, name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude) {

    validate.string(name, 'name')
    validate.string(breed, 'breed')
    validate.boolean(gender, 'gender')
    validate.string(size, 'size')
    validate.number(age, 'age')
    validate.string(notes, 'notes')
    validate.boolean(neutered, 'neutered')
    validate.boolean(withDogs, 'withDogs')
    validate.boolean(withCats, 'withCats')
    validate.boolean(withChildren, 'withChildren')
    validate.string(chip, 'chip')

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw Error('User does not exist.')

        if ((await Dog.findOne({ chip: chip }))) throw new Error(`Dog with chip ${chip} already exists`)

        const dog = new Dog({
            name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, location: { coordinates: [longitude, latitude] }
        })

        dog.owner = id
        user.dogs.push(dog.id)

        await Promise.all([dog.save(), user.save()])

        return dog.id
    })()
}