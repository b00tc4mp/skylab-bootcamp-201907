const DuckItem = require('./duck-item')

module.exports = function(ducks) {
    return `<ul>${ducks.map(duck => `<li class="li">${DuckItem(duck)}</li>`).join('')}</ul>`
}