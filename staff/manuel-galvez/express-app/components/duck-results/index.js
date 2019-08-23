const DuckItem = require('../duck-item')

module.exports = function(ducks, view) {
    return ducks.length ?
            `<ul class="ducks">
                ${ducks.map(duck => 
                    `<li class="ducks__item">${DuckItem(duck)}</li>`).join('')}</ul>`
                :
            (!ducks.length && view === 'favorites') && 
                `<div class="missing-favorites">
                    <i class="far fa-heart"></i>
                    <h3>There are no favorites</h3>`
}