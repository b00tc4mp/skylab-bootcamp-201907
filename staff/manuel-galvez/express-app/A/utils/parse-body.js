const qs = require('querystring')

function parseBody(req, res, next) {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        // EXAMPLE name=n&surname=s&email=e%40mail.com&password=p&repassword=p

        if (body && body.length) {
            const keyValues = body.split('&')

            req.body = keyValues.reduce((body, keyValue) => {
                const [key, value] = keyValue.split('=')

                body[key] = qs.unescape(value)

                return body
            }, {})

            next()
        }
    })
}

module.exports = parseBody