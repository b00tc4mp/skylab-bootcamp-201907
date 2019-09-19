const { validate } = require('utils')
const { models: { User, Space } } = require('data')

/**
 * Registers a space.
 * 
 * @param {*} title space name
 * @param {*} type space type
 * @param {*} picture space picture according to space type
 * @param {*} address space address
 * @param {*} passcode space passcode
 * @param {*} id user id 
 * 
 * 
 * @throws {TypeError} - if any of the parameters is not a string.
 * @throws {Error} - if any parameter is empty or undefined, if user is not found, if there is already a space registered under the same passcode.
 *  
 * 
 * @returns {String} space id
 */

module.exports = function(title, type, picture, address, passcode, id) {

    validate.string(title, 'space name')
    validate.string(type, 'space type')
    validate.string(picture, 'picture')
    validate.string(address, 'space address')
    validate.string(passcode, 'space passcode')
    validate.string(id, 'creator-user id')

    return (async () => {
        const result = await Space.findOne({ passcode })
        if (result) throw Error('space already exists')
        
        const user = await User.findById(id) 
        if (!user) throw Error('user does not exist')
        
        const space = new Space({ title, type, picture, address, passcode })
        space.cousers.push(user._id)
        await space.save()
        
        const spaceId = space._id.toString()
        delete space._id
        
        user.spaces.push(spaceId)
        await user.save()
    
        return spaceId
    })()
}    
