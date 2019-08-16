const FavButton = require('./favbutton')


function DuckDetail({ id , title , imageUrl , price , description , link , favorite }) {
    const pathname = `/ducks/${id}`
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">Go to store</a>
        ${FavButton(favorite , id , pathname)}
    </article>`
}

module.exports = DuckDetail