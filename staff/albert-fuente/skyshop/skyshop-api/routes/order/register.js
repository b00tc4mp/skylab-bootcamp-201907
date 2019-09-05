const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { body:{...itemId}, params: { ownerId } } = req

    try {
        await logic.order.register(ownerId,...itemId)
            .then((orderId) => res.status(201).json({ message: 'Order registered successfully',orderId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}