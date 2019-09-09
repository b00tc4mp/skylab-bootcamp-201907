const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Retrieves a drumkit by its id and its creator id
 * 
 * @param {*} id 
 * @param {*} creator
 * @returns {Promise}
 * 
*/

module.exports = function(id, creator) {
    validate.string(id, 'id')
    validate.string(creator, 'creator')

    return (async () => {
        const user = await User.findById(creator)
        const drumkits = user.drumkits
        const drumkit = drumkits.find(drumkit => {
            if(drumkit._id.toString() === id) 
            return drumkit
        })
        if (!drumkit) throw Error(`drumkit with id ${id} does not exist`)
            return drumkit
        
    })()

 
}