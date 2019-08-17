const path = require('./config')
const literals = require('./i18n')

const DuckItem = require('../duck-item')

module.exports = function(ducks , lang) {
    const { header } = literals[lang]

    return `
            <h2>${header}</h2>
            <ul>${ducks.map(duck => `<li>${DuckItem(duck)}</li>`).join('')}</ul>`
}