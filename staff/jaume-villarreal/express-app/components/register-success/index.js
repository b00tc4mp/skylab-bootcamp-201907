const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang) {
    const { success, signIn } = literals[lang]
    
    return `<section class="register-success">
                <div class="register-success__box">
                    <p >${success}</p>
                    <a class='btn btn--register-success' href="${path}">${signIn}</a>
                </div>
            </section>`
}