const FavButton = require('../fav-button')
const literals = require('./i18n')



function DuckDetail(ducks, lang, gobackPath) {
    const { title, imageUrl, price, description, link, id, favorite } = ducks

    return `<article>
    <h2>${title}</h2>
    <img src=${imageUrl} />
    <p>${price}</p>
    <p>${description}</p>
    <a href="${link}" target="blank">${literals[lang].gotostore}</a>
    ${FavButton(favorite, id)}
    </article>
    <a href="${gobackPath}">${literals[lang].goback}</a>`
}

module.exports = DuckDetail