const { ObjectId } = require('mongodb')
const  validate  = require("../../utils")

module.exports = {
    /**
     * change personal data throug updateOne function
     *  
     * @param {string} userId
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * 
     * @returns {Promise}
    */
    updateUser(name, surname, email, password, userId){
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.email(email, 'username')
        validate.string(password, 'password')

        return this.__users__.findOne({ _id: ObjectId(userId) })
        .then((user) => { 
            if(!user) throw Error("this user does not exist")
            if(name === undefined) name = user.name
            if(surname === undefined) surname = user.surname
            if(email === undefined) email = user.email
            if(password === undefined) password = user.password

            this.__users__.updateOne({ _id: ObjectId(userId) }, { $set: { "name": `${name}`, "surname": `${surname}`, "email":`${email}`, "password": `${password}` }})
        })   
    }
}