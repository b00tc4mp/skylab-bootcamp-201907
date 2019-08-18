const { path } = require('./config')
const literals = require('./i18n')

function Search(lang, query) {
    const { search } = literals[lang]

    return `<form action="${path}">
<input type="text" name="q" value="${query || ''}">
<button>${search}</button>
</form>`
}

module.exports = Search