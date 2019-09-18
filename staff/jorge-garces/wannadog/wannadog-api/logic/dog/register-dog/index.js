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

module.exports = function (id, registerParams) {

    Object.keys(registerParams).forEach(key => {
        registerParams[key] == 'true' ? registerParams[key] = true : ''
        registerParams[key] == 'false' ? registerParams[key] = false : ''
    })

    validate.string(registerParams.name, 'name')
    validate.string(registerParams.breed, 'breed')
    validate.boolean(registerParams.gender, 'gender')
    validate.string(registerParams.size, 'size')
    validate.number(registerParams.age, 'age')
    validate.string(registerParams.notes, 'notes')
    validate.boolean(registerParams.neutered, 'neutered')
    validate.boolean(registerParams.withDogs, 'withDogs')
    validate.boolean(registerParams.withCats, 'withCats')
    validate.boolean(registerParams.withChildren, 'withChildren')
    validate.number(registerParams.longitude, 'longitude')
    validate.number(registerParams.latitude, 'latitude')
    validate.string(registerParams.chip, 'chip')

    const { name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, longitude, latitude } = registerParams
    const image = "https://res.cloudinary.com/jorgedev/image/upload/v1568745142/nodogpic_gzjnmm.jpg"
    return (async () => {

        const user = await User.findById(id)
        if (!user) throw Error('User does not exist.')

        if ((await Dog.findOne({ chip: chip }))) throw new Error(`Dog with chip ${chip} already exists`)

        const dog = new Dog({
            name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, location: { coordinates: [longitude, latitude] }, image
        })

        dog.owner = id
        user.dogs.push(dog.id)

        await Promise.all([dog.save(), user.save()])

        return dog.id
    })()
}