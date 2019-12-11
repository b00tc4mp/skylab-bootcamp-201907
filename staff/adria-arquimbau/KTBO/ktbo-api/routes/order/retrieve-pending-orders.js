const retrievePendingOrders = require('../../logic/order/retrieve-pending-orders')

module.exports = function(req, res) {

    const { userId } = req
        
    try {
        retrievePendingOrders(userId)
            .then((orders) => res.status(201).json({ message: `All pending orders retrieved successfully`, orders}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}