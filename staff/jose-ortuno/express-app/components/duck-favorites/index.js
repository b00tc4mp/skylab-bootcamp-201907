const literals = require('./i18n')
const DuckDetail = require('../duck-detail')

module.exports = function (ducks, lang) {
    const { title, noFavs } = literals[lang]

    let output = `<h1>${title}</h1>`
    
    if (ducks.length === 0) output += (`<p>${noFavs}</p>`)
    else output += (`<ul>${ducks.map(duck => `<li>${DuckDetail(duck, lang)}</li>`).join('')}</ul>`)
    return output
}