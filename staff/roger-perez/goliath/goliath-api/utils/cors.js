function cors(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, DELETE, POST, PUT, PATCH'
    })
 
    next()
 }
 
 module.exports = cors