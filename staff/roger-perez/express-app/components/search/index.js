const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (query, lang) {
    const { search } = literals[lang]

    return `<form action="${path}">
        <input class="header__search-input "type="text" name="q" value="${query || ''}">
        <button class="header__button">${search}</button>
    </form>`
}