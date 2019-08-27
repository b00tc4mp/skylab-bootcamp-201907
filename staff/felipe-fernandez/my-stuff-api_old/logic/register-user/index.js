const {User} = require('../../models')

const validate = require('../../utils/validate')



function registerUser(name,surname,email, password){

  validate.string(name, 'name')
  validate.string(surname, 'surname')
  validate.string(email, 'email')
  validate.email(email, 'email')
  validate.string(password, 'password')

   return User.findOne({email})
     .then(user => {
       if(user) throw Error("User exists")
       return User.create({name, surname, email, password})     
    })
    .then(user=> user)

}


module.exports = registerUser