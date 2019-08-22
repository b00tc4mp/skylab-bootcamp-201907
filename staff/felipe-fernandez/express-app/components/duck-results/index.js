const DuckItem = require('../duck-item')

module.exports = function(ducks) {
    return `<ul class="duck-results">${ducks.map(duck => `<li>${DuckItem(duck)}</li>`).join('')}</ul>`
}