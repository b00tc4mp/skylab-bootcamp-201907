const DuckDetail = require('./duck-detail')

function Favorites(ducks, view) {
    return ducks.length ?
    `<ul>${ducks.map(duck => `<li>${DuckDetail(duck, view)}</li>`).join('')}</ul>`
    : 
    `<h2>No existen favoritos</h2>`
}

module.exports = Favorites