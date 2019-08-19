const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang) {
    const { success, signIn } = literals[lang]
    
    return `<div class="register-success">
    <p>
        ${success} <a href="${path}">${signIn}</a>.
    </p>
    </div>`
}