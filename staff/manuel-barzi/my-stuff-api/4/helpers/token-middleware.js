const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (req, res, next) => {
    try {
        const { params: { id }, headers: { authorization } } = req

        if (!authorization) throw new Error('no authorization token received')

        const token = authorization.slice(authorization.indexOf(' ') + 1)

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        req.userId  = userId

        next()
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}