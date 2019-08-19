const FavButton = require('./fav-button')

module.exports = function ({id, title, imageUrl, price, favorite}){
  return   `<a href="/ducks/${id}">
            <h3 class="item--title">${title}</h3>
            <img class="item--image"src="${imageUrl}">
            <span class="item--price">${price}</span>
            ${FavButton(id, favorite)}
            </a>`
}