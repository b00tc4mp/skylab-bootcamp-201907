const DuckItem = require('../duck-item/duck-item')

module.exports = function(ducks) {
    return `<ul>${ducks.map(duck => `<li>${DuckItem(duck)}</li>`).join('')}</ul>`
}