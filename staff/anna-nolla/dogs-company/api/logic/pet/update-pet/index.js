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
    
        let petIndex = await user.pets.findIndex(item => item.id === petId)
           if (petIndex === -1) throw Error("This user has no pet with this id")

            user.pets[petIndex] = data
            user.pets[petIndex]._id = petId
    
        await user.save()
    })()
}    