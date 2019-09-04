const { validate } = require('utils')
const { models: { User, Pet} } = require('data')

/**
 * to retrieve one pet that an owner has
 * 
 * @param {string} id
 * @param {string} petId
 * 
 * @returns {Promise}
 * 
*/

module.exports = function(id, petId) {
    
    validate.string(id, 'user id')
    validate.string(petId, 'pet id')

    return (async () => {        
        const user = await User.findById(id).lean()
            if (!user) throw Error(`This user does not exist.`)
            else {
                const pet = user.pets.find(pet => {
                    if(pet._id.toString() === petId) return pet
                })
                if (!pet) throw Error('This user does not have this pet')
                else {
                    pet._id = petId
                    return pet
                }
            }    
    })()
}
