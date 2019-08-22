const FavButton = require('./fav-button')

function DuckItem ({ id, title, imageUrl, price, favorite }) {
    return `<a href="/detail/${id}">
            <h3>${title}</h3>
            <img src="${imageUrl}">
            <span>${price}</span>
            ${FavButton(id, favorite)}
        </a>`
}

module.exports = DuckItem