const jwt = require ('jsonwebtoken')

const {env: {JWT_SECRET} } = process

module.exports = (request, response, next) => {
    try{
        const {params: {id}, headers: {authorization} } = request

        if (!authorization) throw new Error ('no token recived')

        const token = authorization.slice(authorization.indexOf(' ') +1)

        const {sub} = jwt.verify(token, JWT_SECRET)

        // if (sub !== id) throw new Error (`token id ${sub} not match user id ${id}`)
        if (sub !== id) throw new Error (`token id does not match with user id ${id}`)

        next()
        
    }catch ({ message }) {
        response.status(401).json({error: message})
    }
}