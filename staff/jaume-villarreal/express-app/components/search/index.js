const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (query, lang) {
    const { search } = literals[lang]

    return `<form action="${path}">
        <input class="search-box" type="text" name="q" value="${query || ''}"/>
        <button class="btn btn--search">${search}</button>
    </form>`
}