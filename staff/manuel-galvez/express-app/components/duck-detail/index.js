const FavButton = require('../fav-button')
const locale = require('./i18n')
const { searchPath } = require('./config')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }, lang, query, view) {
    const { store, goback } = locale[lang]
    let goBackPath
    view.includes('favorites') ? goBackPath = '/favorites' : goBackPath = `/search?q=${query}`
    
    return `<article class="duck-detail">
        <h3 class="duck-detail__title">${title}</h3>
        <img  class="duck-detail__img"src="${imageUrl}">
        <span class="duck-detail__price>${price}</span>
        <p class="duck-detail__description">${description}</p>
        <div class="duck-detail__footer">
            ${FavButton(id, favorite)}
            <div class="duck-detail__anchors">
                <a class="duck-detail__link" href="${link}" target="_blank">${store}</a>
                <a class="duck-detail__back" href="${goBackPath}">${goback}</a>
            </div>
        </div>
    </article>`
}

module.exports = DuckDetail