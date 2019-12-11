const removePendingOrder = require('../../logic/order/remove-pending-order')

module.exports = function(req, res) {
    
    const { userId, params: { orderId }} = req
        
    try {
        removePendingOrder(userId , orderId)
            .then(() => res.status(201).json({ message: `Pending order removed successfully`}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}