const path = require('./config')
const literals = require('./i18n')

const DuckItem = require('../duck-item')

module.exports = function(ducks , lang) {
    const { header } = literals[lang]

    return `
            <h2 class="header__fav">${header}</h2>
            <ul class="list-results">${ducks.map(duck => `<li class="list-results__item">${DuckItem(duck)}</li>`).join('')}</ul>`
}