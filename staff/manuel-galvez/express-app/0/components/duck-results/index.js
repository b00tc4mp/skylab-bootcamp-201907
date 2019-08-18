const DuckItem = require('../duck-item')

module.exports = function(ducks) {
    return `<ul class="ducks">${ducks.map(duck => `<li class="ducks__item">${DuckItem(duck)}</li>`).join('')}</ul>`
}