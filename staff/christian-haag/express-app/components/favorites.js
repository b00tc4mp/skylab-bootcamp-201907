const FavButton = require('./fav-button')

function Favorites(ducks, gobackPath) {

    return `
        <h1>Favorites</h1>
        <ul>${ducks.map(({ title, imageUrl, price, favorite, id }) => ` <li>
            <h2>${title}</h2>
            <img src=${imageUrl} />
            <p>${price}</p>
            ${FavButton(favorite, id)}
            </li>`).join('')}</ul>
        <a href="${gobackPath}">Go back</a>`
}

module.exports = Favorites