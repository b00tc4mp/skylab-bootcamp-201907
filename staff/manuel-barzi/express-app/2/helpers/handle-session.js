const retrieveSessionIdFromCookies = require('./parse-session-id-cookie')

let sessionIds = 0
const sessions = {}

function handleSession(req, res) {
    let sid = retrieveSessionIdFromCookies(req)

    let session

    if (sid) {
        session = sessions[sid]

        if (!session) session = sessions[sid] = {}
    } else {
        sid = sessionIds++

        session = sessions[sid] = {}

        res.setHeader('Set-Cookie', `session-id=${sid}`)
    }

    return session
}

module.exports = handleSession