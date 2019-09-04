const { validate } = require('utils')
const { models: { User, Pet } } = require('data')

/**
 * register a pet and link it to the owner
 * 
 * @param {string} id 
 * @param {string} name 
 * @param {number} age 
 * @param {string} characteristics
 * 
 * @returns {Promise}
 */

module.exports = function(id, name, age, characteristics) {
    let petId

    validate.string(id, 'user id')
    validate.string(name, 'name')
    // validate number falta
    validate.string(characteristics, 'characteristics')

    return (async () => {  
        const user = await User.findById(id)
            if (!user) throw Error('User does not exists.')
            else {
                const pet = await user.pets.find(pet => (pet.name === name && pet.age === age))
                    if (pet) throw Error('Pet already exists')
                    else {
                        const newPet = new Pet({ name, age, characteristics })
                        petId = newPet.id
                        user.pets.push(newPet)
                        await user.save()
                        return petId
                }
            }
    })()
}