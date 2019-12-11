const retrieveAllUserOrders = require('../../logic/order/retrieve-all-user-orders')

module.exports = function(req, res) {

    const { userId } = req
        
    try {
        retrieveAllUserOrders(userId)
            .then((orders) => res.status(201).json({ message: `Orders of user with id ${userId} retrieved successfully`, orders}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}