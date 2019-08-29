const logic = require('../logic/index')

module.exports = function( req, res ){
    const { params: { id }, body: {password} } = req
    /* const token = authorization.slice(authorization.indexOf(' ') + 1) */
    try {
       /*  jwt.verify(token, secret) */
        logic.unregisterUser(id, password)
            .then(() => res.json({ message: 'user correctly unregistered'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}