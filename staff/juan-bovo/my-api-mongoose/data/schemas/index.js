// const mongoose = require('mongoose')

// const { Schema } = mongoose

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   surname: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   },
//   password: {
//     type: String,
//     required: true
//   }
// })

module.exports = {
  user: require('./user')
}

// module.exports = { userSchema } 
