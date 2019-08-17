const DuckItem = require('../duck-item')

module.exports = function(ducks) {
    return `<ul class="list-results">${ducks.map(duck => `<li class="list-results__item">${DuckItem(duck)}</li>`).join('')}</ul>`
}