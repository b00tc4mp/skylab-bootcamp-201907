const validate = require('../../utils/validate')

module.exports = {
    /**
     * Updates an existing user account.
     * 
     * @param {*} email 
     * @param {*} name 
     * @param {*} surname 
     * @param {*} password 
     * 
     * @returns {Promise}
     */ 

    updateUser(email, name, surname, password) {

      validate.string(name, 'name')
      validate.string(surname, 'surname')
      validate.string(email, 'email')
      validate.string(password, 'password')

      return this.__users__.findOneAndUpdate({ email }, { $set: { name, surname, password } })
        .then(() =>{
            
        })
        
  }
}