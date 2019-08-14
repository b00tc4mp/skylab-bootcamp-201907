function parseCookies(req) {
    const { headers: { cookie } } = req

    let cookies

    if (cookie && cookie.length) {
        const keyValues = cookie.split(';').map(keyValue => keyValue.trim())

        cookies = keyValues.reduce((cookies, keyValue) => {
            const [key, value] = keyValue.split('=')

            cookies[key] = value

            return cookies
        }, {})
    }

    return cookies
}

module.exports = parseCookies