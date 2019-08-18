const { path } = require('./config')
const literals = require('./i18n')

function RegisterSuccess(lang, path) {
    const { text, login } = literals[lang]
    return `<p>
    ${text}<a href="${path}">${login}</a></p>`
}
module.exports = RegisterSuccess