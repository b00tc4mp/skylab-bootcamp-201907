const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (req, res, next) => {
    try {
        const { params: { id }, headers: { authorization } } = req
        if (!authorization) throw new Error('no authorization token received')

        const token = authorization.slice(authorization.indexOf(' ') + 1)
        const { sub: {id: subId} } = jwt.verify(token, JWT_SECRET)
        if (subId !== id) throw new Error(`token id ${subId} does not match user id ${id}`)

        next()

    } catch({message}) {
        res.status(401).json({ error: message })
    }
}