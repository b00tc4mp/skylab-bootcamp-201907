const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')
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

        return this.__users__.deleteOne({_id: ObjectId(id), email, password})
            .then(response=>{
                if(response.deletedCount===0) throw Error ("There was an error unregistering the user")
                
            })
            
       
        }