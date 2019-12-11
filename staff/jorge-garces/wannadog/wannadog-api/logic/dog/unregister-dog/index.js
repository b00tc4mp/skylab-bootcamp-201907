const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Dog } = models

/**
 * Unregisters a dog by their id
 * 
 * @param {string} id 
 * @param {string} email
 * @param {string} password 
 * 
 * @returns {Promise}
*/
module.exports = function (id, email, password, dogId) {
    validate.string(id, 'id')
    validate.string(email, 'email')
    validate.string(password, 'password')
    validate.string(dogId, 'dog id')

    let response

    return (async () => {
        const confirmUser = await User.findOne({ email, dogs: dogId })
        if (confirmUser) response = await Dog.deleteOne({ _id: dogId })
        else throw Error(`There was an error unregistering the dog`)
        if (!response.deletedCount) throw Error(`There was an error unregistering the dog`)
        const pet = confirmUser.dogs.findIndex(pet => pet.id === dogId)
        confirmUser.dogs.splice(pet, 1)
        await confirmUser.save()
    })()
}