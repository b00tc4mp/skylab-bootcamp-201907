const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (query, lang) {
    const { search } = literals[lang]

    return `<form class="form" action="${path}">
        <input class="form__text-field" type="text" name="q" value="${query || ''}">
        <button class="form__button">${search}</button>
    </form>`
}