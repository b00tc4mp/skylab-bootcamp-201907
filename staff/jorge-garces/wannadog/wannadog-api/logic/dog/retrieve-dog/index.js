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

        const dog = await Dog.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()
        if (!dog) throw Error(`Dog with id ${id} does not exist.`)
        dog.id = id
        return dog
    })()
}