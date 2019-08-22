const {registerUser} = require('./register-user')
const {authenticateUser} = require('./authenticate-user')
const {retrieveUser} = require('./retrieve-user')
const {updateUser} = require('./update-user')
const {unregisterUser} = require('./unregister-user')

module.exports = {
  registerUser,
  authenticateUser,
  retrieveUser,
  updateUser,
  unregisterUser
}