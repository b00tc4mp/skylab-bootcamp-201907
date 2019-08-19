const literals = require('./i18n')
const { lluis } = require('./config')

function Search(query, lang) {
    const { search }= literals[lang]

    return `<form class="form--search"action="${lluis}">
        <input class="input--search" type="text" name="q" value="${query || ''}">
        <button class="button--search">${search}</button>
        
    </form>`

}

module.exports = Search