//required for endpoints with methods 'retrieve', 'update' and 'delete'
const jwt = require('jsonwebtoken')
const { env : {JWT_SECRET} } = process

module.exports = function( req, res, next){
    const { params : { id } , headers: { authorization }} = req

    try{
    if(!authorization) throw new Error ('authorization token not received')

    const token = authorization.slice(authorization.indexOf(' ')+1)
    const { sub } = jwt.verify(token , JWT_SECRET)

    if(sub !== id) throw new Error (`id token ${sub} doesn't match with id ${id}`)
    next()

    } catch({ message }){
        res.status(400).json({ error : message })
    }
}