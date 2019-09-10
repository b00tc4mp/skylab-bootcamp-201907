const literals = require('./i18n')

module.exports = function (path, lang) {

    const { message, messageEnd } = literals[lang]

    return `<p>${message}<a href="${path}">${messageEnd}</a>.
    </p>`
}