const { validate } = require('utils')
const { models: { User, Pet} } = require('data')

/**
 * to retrieve all the pets that an owner has
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 * 
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')
    let pet = []

    return (async () => {        
        const user = await User.findById(id)
            if (!user) throw Error(`This user does not exist.`)
            else {
                if (user.pets.length === 0) throw Error(`This user does not have pets`) 
                else {
                    user.pets.forEach((item) => {
                        pet.push({ 'name': item.name, 'age': item.age, 'characteristics': item.characteristics })
                    })
                    return pet
                }
            }    
    })()
}