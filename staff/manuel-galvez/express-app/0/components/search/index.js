const locale = require('./i18n')
const { path } = require('./config')

function Search(query, lang) {
    const { search } = locale[lang]
    return `<form class="search__form form" action="${path}">
        <input class="search__input input__form" type="text" name="q" placeholder="Search rubber ducks..." value="${query || ''}">
        <input type="submit" class="search__submit">
    </form>`
}

module.exports = Search