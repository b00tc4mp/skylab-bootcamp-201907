const parseCookies = require('../utils/parse-cookies')

function retrieveSessionIdFromCookies(req) {
    const cookies = parseCookies(req)

    const sid = cookies && cookies['session-id']

    return sid
}

module.exports = retrieveSessionIdFromCookies