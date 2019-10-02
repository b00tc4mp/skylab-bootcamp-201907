const validate = require('utils/validate')
const { models: { User } } = require('data')

/**
 * adds user's location to db
 * @param {string} id 
 * @param {*} location 
 */

function addLocation (id, location) {

    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
    
        if (!user) throw new Error(`user with username ${username} does not exist`)
    
        const _location = { type: 'Point', coordinates: location } 

        user.location = _location
        
        await user.save()
    })()
}

module.exports = addLocation