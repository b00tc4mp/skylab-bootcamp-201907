const favButton = require('./fav-button')

function DuckResults(ducks) {
    return `<ul>${ducks.map(({ id, title, imageUrl, price }) => `<li>
        <a href="/ducks/${id}">
            <h3>${title}</h3>
            <img src="${imageUrl}">
            <span>${price}</span>
            <button>${favButton}</button>
        </a>
    </li>`).join('')}</ul>`
}

module.exports = DuckResults