const validate = require('../../utils/validate')
const {User} = require('../../models')

/**
     * 
     * @param {*} id 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */

   module.exports= function(id, email, password){
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')

        return User.deleteOne({_id: id, email, password})
            .then(result=>{
                if(!result.deletedCount) throw Error ("There was an error unregistering the user")
                
            })
            
       
    }

    // module.exports = function (id, password) {
    //     // validate.string(email, 'email')
    //     // validate.email(email, 'email')
    //     validate.string(password, 'password')
    
    //     return User.deleteOne({ _id: id, password })
    //         .then(result => {
    //             if (!result.deletedCount) throw new Error(`wrong credentials`)
    //         })
    // }