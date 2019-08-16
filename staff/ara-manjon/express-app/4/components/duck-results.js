const DuckItem= require('./fav-button')
function DuckResults(ducks) {
    return `<ul>${ducks.map(({ id, title, imageUrl, price, favorite, duckItem }) => `<li>
        <a href="/ducks/${id}">
            <h3>${title}</h3>
            <img src="${imageUrl}">
            <span>${price}</span>
        </a>
    </li>`).join('')}</ul>`
}

module.exports = DuckResults