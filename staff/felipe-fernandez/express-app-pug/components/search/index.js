const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (query, lang) {
    const { search } = literals[lang]

    return `<form action="${path}">
        <input type="text" name="q" value="${query || ''}">
        <button>${search}</button>
    </form>`
}