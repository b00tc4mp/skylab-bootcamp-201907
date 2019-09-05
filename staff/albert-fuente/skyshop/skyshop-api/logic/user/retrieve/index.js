const {validate} = require('skyshop-utils')
const {models:{User} } = require('skyshop-data')

/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * @param {*} repassword 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'id')

    return(async()=>{
        const user=await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
       
            if (!user) throw Error(`User with id ${id} does not exist.`)
            user.id = id
            return await user
 
    })()
/* 
    return User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        .then(user => {
            if (!user) throw Error(`User with id ${id} does not exist.`)
            user.id = id
            return user
        }) */
}