const DuckDetail = require('../duck-detail')
const literals = require('./i18n')

module.exports = function (ducks, lang) {
    const { favs, noFavs } = literals[lang]
    let output = `<h2>${noFavs}</h2>`
    if (ducks.length == 0) return output
    else {
        output = `<h2>${favs}</h2>`
        output += (`<section class='landing'> <ul>${ducks.map(duck => `<li>${DuckDetail(duck, lang)}</li>`).join('')} </ul> </section>`)
        return output
    }
}