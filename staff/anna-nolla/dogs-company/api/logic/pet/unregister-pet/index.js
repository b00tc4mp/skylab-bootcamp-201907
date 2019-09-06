const { validate } = require('utils')
const { ObjectId, models: { User } } = require('data')

/**
 * Unregisters a pet through the id and the pet id
 * 
 * @param {string} id 
 * @param {string} petId
 * 
 * @returns {Promise}
*/

module.exports = function(id, petId) {

    validate.string(id, 'user id')
    validate.string(petId, 'pet id')

    return (async () => {
        const user = await User.findById(id)
            if(!user) throw Error('There is no user with this id')
         
        const pet = user.pets.findIndex(pet => pet._id === petId)
            if(pet.length === 0) throw Error('This pet is not from this owner')
                  
        user.pets.splice(pet, 1)
        user.save()
                 
    })()
}