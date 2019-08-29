const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang) {
    const { success, signIn } = literals[lang]
    
    return `<section class="register-success">
        <p>
            ${success} <a class="register-success__login" href="${path}">${signIn}</a>.
        </p>
    </section>`
}