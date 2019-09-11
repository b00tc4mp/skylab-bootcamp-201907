const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
//const bcrypt = require('bcryptjs')
const { Poll, User } = models

/**
 * 
 * @param {String} userId
 * @param {String} ciudad
 * @param {String} estado
 *
 * 
 * @returns {Promise}
 */

module.exports = function(userId, ciudad, estado) {
    
    validate.string(userId ,'userId')
    validate.string(ciudad ,'ciudad')
    validate.string(estado ,'estado')

    return (async () => {

        const user = await User.findById(userId, ciudad)

        if (!user) throw Error(`You have to log in to list polls`)
        
        const polls = await Poll.find({ pollStatus : estado })
  
            if (!polls) throw Error(`There are no approved polls to show`)
            else {

            return polls

            }
    })()
}

/*

 module.exports = function() {
    
    return (async () => {
        const polls = await Poll.find( {},{ __v: 0 }).sort({_id:1}).lean() 
        if (!polls) throw Error(`there are no polls`)   
        
        return polls
    })()

*/