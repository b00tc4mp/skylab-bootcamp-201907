const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { body: { date,state }, params: { id } } = req

    try {
        await logic.order.register(id,date,state)
            .then((orderId) => res.status(201).json({ message: 'Order registered successfully',orderId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}