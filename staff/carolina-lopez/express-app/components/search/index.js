const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (query, lang) {
    const { search } = literals[lang]

    return `<section class='search'>
        <form action="${path}" class='form-search'>
            <h3 class='title'>${search}</h3>
            <input type="text" name="q" value="${query || ''}">
            <button class='btn'>${search} 🔍</button>
        </form>
        </section>`
}

