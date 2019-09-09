const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Update a user pet
 * 
 * @param {String} id 
 * @param {String} petId
 * @param {String} data
 * 
 * @returns {Promise}
 */

module.exports = function (id, petId, data) {
    validate.string(id, 'user id')
    validate.string(petId, 'pet id')
    validate.string(data.name, 'name')
    validate.date(data.age, 'age')
    validate.boolean(data.gender, 'gender')
    validate.string(data.size, 'size')
    validate.string(data.characteristics, 'characteristics')


    return (async () => {
       
        let user = await User.findById(id)
            if (!user) throw Error('User does not exists.')
            if (user.pets.length < 0) throw Error('This user does not have pets')
    
        let pet = await user.pets.find(item => item.id === petId)
           if (!pet) throw Error("This user has no pet with this id")

           pet.name = data.name
           pet.age = data.age
           pet.gender = data.gender
           pet.size = data.size
           pet.characteristics = data.characteristics

        await user.save()
    })()
}    