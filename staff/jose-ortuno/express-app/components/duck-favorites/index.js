const literals = require('./i18n')
const DuckDetail = require('../duck-detail')

module.exports = function (ducks, lang, view) {
    const { title, noFavs } = literals[lang]

    return `<section>
            <h1>${title}</h1>
            ${ducks.length === 0 ?  `<p>${noFavs}</p>` : `<ul>${ducks.map(duck => `<li>${DuckDetail(duck, lang, view)}</li>`).join('')}</ul>`}
        </section> `
}