const mongoose = require('mongoose')

const { user , guardian , administrator , activity , shirt , week} = require('./schemas')

module.exports = {
    User : mongoose.model('User' , user),
    Guardian : mongoose.model('Guardian' , guardian),
    Administrator : mongoose.model('Administrator' , administrator),
    Activity : mongoose.model('Activity' , activity),
    Shirt : mongoose.model('Model' , model),
    Week : mongoose.model('Week' , week)
}