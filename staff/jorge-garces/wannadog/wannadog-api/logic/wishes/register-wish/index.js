const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Wish } = models

/**
 * Adds wish to user
 * 
 * @param {string} id 
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
 * @param {number} months
 * @param {number} years
 * 
 * @returns {Promise}
*/

module.exports = function (id, wishParams) {

    if (!(wishParams instanceof Object)) throw Error(`Input ${wishParams} is not an Object`)
    if (Object.keys(wishParams).length === 0) throw Error('Input is empty')

    Object.keys(wishParams).forEach(key => wishParams[key] === undefined ? delete wishParams[key] : '')

    validate.string(id, 'user id')
    if (wishParams.breed) validate.string(wishParams.breed, 'breed')
    if (wishParams.gender) validate.boolean(wishParams.gender, 'gender')
    if (wishParams.size) validate.string(wishParams.size, 'size')
    if (wishParams.months) validate.number(wishParams.months, 'months')
    if (wishParams.years) validate.number(wishParams.years, 'years')
    if (wishParams.neutered) validate.boolean(wishParams.neutered, 'neutered')
    if (wishParams.withDogs) validate.boolean(wishParams.withDogs, 'withDogs')
    if (wishParams.withCats) validate.boolean(wishParams.withCats, 'withCats')
    if (wishParams.withChildren) validate.boolean(wishParams.withChildren, 'withChildren')
    if (wishParams.distance) validate.number(wishParams.distance, 'distance')

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw Error('User does not exist.')

        const wishu = await new Wish(wishParams)
        delete wishu.__v

        user.wishes.push(wishu)
        await user.save()
    })()
}