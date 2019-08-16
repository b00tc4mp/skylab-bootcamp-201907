const FavButton = require('./fav-button')

function DuckDetail(ducks) {
    const { title, imageUrl, price, description, link, duckId, favorites } = ducks

    return `<article>
    <h2>${title}</h2>
    <img src=${imageUrl} />
    <p>${price}</p>
    <p>${description}</p>
    <a href="${link} target='blank> Go to Store</a>
    ${FavButton(favorites, duckId)}
    </article>`
}

module.exports = DuckDetail