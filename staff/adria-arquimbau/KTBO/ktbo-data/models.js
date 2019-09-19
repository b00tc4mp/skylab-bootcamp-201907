const mongoose = require('mongoose')
const { user, article, card, vehicle, property, item, order } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Article: mongoose.model('Article', article),
    Item: mongoose.model('Item', item),
    Order: mongoose.model('Order', order),
    /////////////
    Card: mongoose.model('Card', card),
    Vehicle: mongoose.model('Vehicle', vehicle),
    Property: mongoose.model('Property', property)
}