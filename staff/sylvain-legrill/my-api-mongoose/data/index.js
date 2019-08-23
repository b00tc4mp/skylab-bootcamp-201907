const mongoose = require('mongoose')
const { userSchema, carsSchema } = require ('./schemas')

const models = {
    User: mongoose.model('User', userSchema),
    Car: mongoose.model('Car', carsSchema)
}


module.exports = {mongoose, models}
