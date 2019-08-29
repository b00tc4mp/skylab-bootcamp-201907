const literals = require('./i18n')

function Search(query, path, lang) {

    const { button } = literals[lang]

    return `<form class='form' action="${path}">
        <input type="text" class='search' name="q" value="${query || ''}">
        <button>${button}</button>
    </form>`
}

module.exports = Search