/* npx mocha debug "--/-.spec.js" */
  
  const {
      validate
  } = require('../utils')
  const {
      ObjectId
  } = require('mongodb')

  module.exports = {
      /**
       * 
       * @param {string} name String introduced by user
       * @param {string} surname String introduced by user
       * @param {string} email String introduced by user, it should has condition of email
       * @param {string} password String introduced by user
       * @param {string} repassword String introduced by user, it should be equal to password
       * Introduce the user dades to mongodb://localhost/skylab. 
       * @returns {Promise}
       */
      registerUser(name, surname, email, password, repassword) {

          validate.string(name, 'name')
          validate.string(surname, 'surname')
          validate.string(email, 'username')
          validate.email(email, 'username')
          validate.string(password, 'password')
          validate.string(repassword, 'password repeat')

          if (password !== repassword) throw new Error('passwords do not match')

          return this.__users__.findOne({
                  email
              })
              .then(user => {
                  if (user) throw new Error(`user with e-mail ${email} alredy exists`)
                  else
                      return this.__users__.insertOne({
                          name,
                          surname,
                          email,
                          password
                      })
              })
              .then(() => {})
      },
      /**
       * Authenticates a user by its credentials.
       * 
       * @param {string} email Email introduced by user
       * @param {string} password Password introduced by user
       * 
       * @returns {Promise}
       * 
       * Returns the user id.
       */

      authenticateUser(email, password) {

          validate.string(email, 'username')
          validate.email(email, 'username')
          validate.string(password, 'password')

          return this.__users__.findOne({
                  email
              })
              .then(user => {
                  if (!user) throw Error(`user with e-mail ${email} does not exist`)
                  //data.id = user._id.toString()
                  //data.token = `token-${Math.random()}`
                  if (user.password !== password) throw new Error('wrong credentials.')
                  return user._id.toString()
              })
      },
      /**
       * Retrieves a user by its id.
       * 
       * @param {string} id The id its given by authenticateUser
       * 
       * @returns {Promise}
       * 
       * Returns a user
       */

      retrieveUser(id) {
          return this.__users__.findOne({
                  _id: ObjectId(id)
              }, {
                  projection: {
                      _id: 0,
                      password: 0
                  }
              })
              .then(user => {
                  if (!user) throw new Error(`user with id ${id} not found`)

                  user.id = id
                  return user
              })
      },

      /**
       * Update a user credentials by its email.
       * 
       * @param {string} email The id its given by authenticateUser
       * @param {string} name String introduced by user
       * @param {string} surname String introduced by user
       * @param {string} password String introduced by user
       * 
       * @returns {Promise}
       */

      updateUser(email, name, surname, password) {
          return this.__users__.findOneAndUpdate({
                  email
              }, {
                  $set: {
                      name,
                      surname,
                      password
                  }
              })
              .then(() => {})
      },

      /**
       * Delete a user by its id.
       * 
       * @param {string} id The id its given by authenticateUser
       * 
       * @returns {Promise}
       * 
       * Returns a user
       */
      deleteUser(id) {


          validate.string(id, 'id')

          return this.__users__.findOne({_id: ObjectId(id)})
          .then(user => {
              debugger
            if (!user) throw new Error(`user does not exist`)
            
            return this.__users__.deleteOne({_id: ObjectId(id)})

        })

      },


  }
