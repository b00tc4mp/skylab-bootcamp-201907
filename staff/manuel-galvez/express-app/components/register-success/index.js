const locale = require('./i18n')
const { path } = require('./config')

module.exports = function(lang) {
    const {message, signin} = locale[lang]
    return `<p>
        ${message}. <a href="${path}">${signin}</a>.
    </p>`
}