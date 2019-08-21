const validate = require('../utils/validate')
// const ObjectId = require('mongodb')

module.exports = {
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

   

    registerUser(name, surname, email, password, repassword) {
        // TODO this.__users__.findOne/.insertOne...
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')
        validate.string(repassword, 'password repeat')
   
        return this.__users__.findOne({ email})
        .then(user => { 
            if(user) throw Error ('User exists')  
            this.__users__.insertOne({ name, surname, email, password})                
        })
        .then(()=> {})
       
 

},

    authenticateUser(email,password){

        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')

        return this.__users__.findOne({ email, password})
        .then(response => { 
            if(!response) throw error  
            response.id=`id-${Math.random()}`
            response.token = `token-${Math.random()}`
            return response
        })

       

},

    retrieveUser(id, token){
        // validate.string(id, 'id')
        // validate.string(token, 'token')
        debugger
        return this.__users__.findOne({ id, token})
        
        .then(response => { 
            
            // if(!response) throw error  
            return response
        })     

    }
}