const literals = require('./i18n')
const { path } = require('./config')
const Feedback = require('../feedback')

module.exports = function (query, lang, error) {
    const { search } = literals[lang]

    return `<form class="search" action="${path}">
        <input type="text" name="q" value="${query || ''}">
        <button>${search}</button>
    </form>
    ${error ? Feedback(error): ''}`


}