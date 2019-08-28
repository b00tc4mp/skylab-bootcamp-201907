const { path } = require('./config')
const literals = require('./i18n')

function Search(lang, query) {
    const { search } = literals[lang]

    return `<form class="header__search" action="${path}">
<input class="header__search-input" type="text" name="q" value="${query || ''}">
<button class="header__search-button">${search}</button>
</form>`
}

module.exports = Search