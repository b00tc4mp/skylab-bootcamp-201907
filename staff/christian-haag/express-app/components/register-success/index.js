const { path } = require('./config')
const literals = require('./i18n')

function RegisterSuccess(lang, path) {
    const { text, login } = literals[lang]
    return `
    <section class="register-success">
        <p class="text">${text}<a href="${path}">${login}</a></p>
    </section>`
}
module.exports = RegisterSuccess