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
        return this.__users__.findOne({ email })
        .then(user => {
            if(user) throw Error("Email already exists")
            this.__users__.insertOne({name, surname, email, password})
        })
    }
}