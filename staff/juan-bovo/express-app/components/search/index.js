const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (query, lang) {
    const { button } = literals[lang]

    return `<form action="${path}">
        <input type="text" name="q" value="${query || ''}">
        <button>${button}</button>
    </form>`
}

