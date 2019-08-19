const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (query, lang) {
    const { search } = literals[lang]

    return `<form class="header__frm" action="${path}">
        <input class="header__frm-search "type="text" placeholder="${search}" name="q" value="${query || ''}">
        <button class="header__frm-button">${search}</button>
    </form>`
}