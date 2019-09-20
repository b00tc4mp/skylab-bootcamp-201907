const literals = require('./i18n')

module.exports = function (query, path, lang) {
    const { search } = literals[lang]
    return `<form action="${path}">
        <input type="text" name="q" value="${query || ''}">
        <button>${search}</button>
    </form>`
}