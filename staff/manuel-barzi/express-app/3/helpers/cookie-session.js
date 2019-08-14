const handleSession = require('./handle-session')

function cookieSession(req, res, next) {
    const session = handleSession(req, res)

    req.session = session

    next()
}

module.exports = cookieSession
