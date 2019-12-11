const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { Dog } = models

/**
 * Retrieves a dog from DB
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function (id) {

    validate.string(id, 'DogID')

    return (async () => {

        const dog = await Dog.findOne({ _id: id }, { _id: 0, __v: 0 }).populate("owner", "name").lean()
        if (!dog) throw Error(`dog with id ${id} does not exist.`)
        dog.id = id

        dog.age === 1 ? dog.age = "Puppy" : {}
        dog.age === 2 ? dog.age = "Less than a year old" : {}
        dog.age === 3 ? dog.age = "1 to 5 years old" : {}
        dog.age === 4 ? dog.age = "5 to 10 years old" : {}
        dog.age === 5 ? dog.age = "Senior" : {}

        dog.gender === true ? dog.gender = "Male" : dog.gender = "Female"
        dog.withDogs ? dog.withDogs = "Good with dogs" : {}
        dog.withCats ? dog.withCats = "Good with cats" : {}
        dog.withChildren ? dog.withChildren = "Good with Children" : {}

        return dog
    })()
}