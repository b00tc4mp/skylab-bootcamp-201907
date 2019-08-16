const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang) {
    return `<p>
        User successfully registered, you can now proceed to <a href="${path}">${literals[lang].title}</a>.
    </p>`
}
