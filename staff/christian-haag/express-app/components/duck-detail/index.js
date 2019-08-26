const FavButton = require('../fav-button')
const literals = require('./i18n')



function DuckDetail(ducks, lang, gobackPath) {
    const { title, imageUrl, price, description, link, id, favorite } = ducks

    return `
    <article class="duck-container">
    <div class="duck-container__item">
        <h3 class="duck-container__item-h3">${title}</h3>
        <img class="duck-container__item-image" src="${imageUrl}" />
        <p class="duck-container__item-price">${price}</p>
        <p class="duck-container__item-description">${description}</p>
        <div class="duck-container__item-bottom">
            <a class="duck-container__item-link" href="${link}" target="blank">${literals[lang].gotostore}</a>
            ${FavButton(favorite, id)}
        </div>
    </div>
    </article>
    <a href="${gobackPath}">${literals[lang].goback}</a>`
}

module.exports = DuckDetail