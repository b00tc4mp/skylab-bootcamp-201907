const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { Dog } = models

/**
 * Scans the DB for dogs matching search criteria
 * 
 * @param {string} breed
 * @param {boolean} gender
 * @param {string} size
 * @param {number} years
 * @param {number} months
 * @param {boolean} neutered
 * @param {boolean} withDogs
 * @param {boolean} withCats
 * @param {boolean} withChildren
 * @param {number} distance
 * @param {number} age
 * 
 * @returns {Promise}
*/

module.exports = function (searchParams) {
    const { location, distance } = searchParams
    const { coordinates } = location

    if (!(searchParams instanceof Object)) throw Error(`Input ${searchParams} is not an Object`)
    if (Object.keys(searchParams).length === 0) throw Error('Input is empty')

    Object.keys(searchParams).forEach(key => {

        (searchParams[key] === undefined || searchParams[key] === 0) ? delete searchParams[key] : ''
        searchParams[key] == 'true' ? searchParams[key] = true : ''
        searchParams[key] == 'false' ? searchParams[key] = false : ''
    })

    if (searchParams.breed) validate.string(searchParams.breed, 'breed')
    if (searchParams.gender) validate.boolean(searchParams.gender, 'gender')
    if (searchParams.size) validate.string(searchParams.size, 'size')
    if (searchParams.age) validate.number(searchParams.age, 'age')
    if (searchParams.neutered) validate.boolean(searchParams.neutered, 'neutered')
    if (searchParams.withDogs) validate.boolean(searchParams.withDogs, 'withDogs')
    if (searchParams.withCats) validate.boolean(searchParams.withCats, 'withCats')
    if (searchParams.withChildren) validate.boolean(searchParams.withChildren, 'withChildren')
    if (searchParams.distance) validate.number(searchParams.distance, 'distance')
    if (searchParams.age) validate.number(searchParams.age, 'age')

    return (async () => {
        let dogs
        if (searchParams.location.coordinates[0] === 0) {
            delete searchParams.location
            dogs = await Dog.find(searchParams, { __v: 0 }).lean()
        } else {
            delete searchParams.distance
            searchParams.location = { $nearSphere: { $geometry: { type: "Point", coordinates }, $maxDistance: distance } }
            dogs = await Dog.find(searchParams, { __v: 0 }).lean()
        }
        dogs.map(dog => {
            dog.id = dog._id.toString()
            delete dog._id
            dog.gender === true ? dog.gender = "Male" : dog.gender === "Female"

            dog.age === 1 ? dog.age = "Puppy" : {}
            dog.age === 2 ? dog.age = "Less than a year old" : {}
            dog.age === 3 ? dog.age = "1 to 5 years old" : {}
            dog.age === 4 ? dog.age = "5 to 10 years old" : {}
            dog.age === 5 ? dog.age = "Senior" : {}

        })
        return dogs
    })()
}