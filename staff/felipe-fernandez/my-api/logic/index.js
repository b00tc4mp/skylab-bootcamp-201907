const validate = require('../utils/validate')
const { ObjectId } = require('mongodb')

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

   

    registerUser(name, surname, email, password) {
        // TODO this.__users__.findOne/.insertOne...
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')
   
        return this.__users__.findOne({ email})
        .then(user => { 
            if(user) throw Error ('User exists')  
            this.__users__.insertOne({ name, surname, email, password})                
        })
        .then(()=> {})
       
 

},
    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */
    // authenticateUser(email,password){

    //     validate.string(email, 'email')
    //     validate.email(email, 'email')
    //     validate.string(password, 'password')

    //     return this.__users__.findOne({ email, password})
    //     .then(response => { 
    //         if(!response) throw error  
    //         response.id=`id-${Math.random()}`
    //         response.token = `token-${Math.random()}`
    //         return response
    //     })

    authenticateUser(email, password) {
        // TODO validate fields
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user || user.password !== password) throw new Error(`user with e-mail ${email} does not exist`)

                return user._id.toString()
            })
    },


    /**
     * 
     * @param {*} id 
     * @param {*} token 
     * 
     * @returns {Promise}
     */
    retrieveUser(id){
        validate.string(id, 'id')
        // debugger
        // return this.__users__.findOne({ id, token})
        
        // .then(response => { 
            
        //     // if(!response) throw error  
        //     return response
        // })    
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                if(!user) throw new Error(`user with id ${id} not found`)
                user.id = id

                return user
            }) 

    

    },

    /**
     * 
     * @param {*} id 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */

    unregisterUser(id, email, password){
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')

        return this.__users__.deleteOne({_id: ObjectId(id), email, password})
            .then(response=>{
                if(response.deletedCount===0) throw Error ("There was an error unregistering the user")
                //return response
            })
            
       
    },
        updateUser(id, fieldsToUpdate) {
        /**
         * 
         * @param {*} id
         * @param {*} fieldsToUpdate 
         * 
         * @returns {Promise}
         */
         validate.string(id, 'id')
         return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: fieldsToUpdate })
            .then(user => {
                if (!user) throw Error('Fail to update fields')
                else if (user.result.ok === 0) throw Error('Wrong fields provided.')
            })
    }
}