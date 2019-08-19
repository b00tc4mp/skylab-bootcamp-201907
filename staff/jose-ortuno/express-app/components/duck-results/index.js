const DuckItem = require('../duck-item')

module.exports = function(ducks) {
    return `<section class="duck-results">
            <ul>${ducks.map(duck => `<li>${DuckItem(duck)}</li>`).join('')}</ul>
        <section>`
}