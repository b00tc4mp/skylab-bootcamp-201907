const mongoose = require ('mongoose')
const { user } = require ('./schema') 

module.exports = {
    User: mongoose.model ('User', user),
    // Vehicle: mongoose.model ('Vehicle', vehicle)
    
}