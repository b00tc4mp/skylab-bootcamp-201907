const { ObjectId } = require('mongodb')

//require de utils
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
        //validate.string(name , 'name')
        // TODO this.__users__.findOne/.insertOne...
        if (password !== repassword) throw Error("idiota")
        return this.__users__.findOne({ email: `${email}` })
            .then(user => {
                if(user) throw Error("Email already exists")
                this.__users__.insertOne({ name, surname, email, password })
        })
    },

    /**
     * Authenticates a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise}
     */
    authenticateUser(email, password) {
        // TODO validate fields

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user || user.password !== password) throw new Error(`Wrong credentials.`)

                return user._id.toString()
            })
    },

    /**
     * Retrieves a user by its id.
     * 
     * @param {string} id 
     * 
     * @returns {Promise}
     */
    retrieveUser(id) {
        // TODO validate fields

        // VIKING style
        // return this.__users__.findOne({ _id: ObjectId(id) })
        //     .then(user => {
        //         user.id = user._id.toString()
        //         delete user._id
        //         delete user.password

        //         return user
        //     })

        // TUNED style
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                user.id = id

                return user
            })
    },

    updateUser(email, name, surname, password) {

        return this.__users__.findOneAndUpdate({ email }, { $set: { name, surname, password } })
          .then(() =>{
              
          })
            

    }


//     authenticateUser(email, password){
//         debugger
//         return this.__users__.findOne({ email, password })
//         .then(user => {
//             if(user) throw Error("Wrong credentials")
//             data.id = response._id.toString()
//                 data.token = `token-${Math.random()}`
//                 return data

//         })

//     }
}