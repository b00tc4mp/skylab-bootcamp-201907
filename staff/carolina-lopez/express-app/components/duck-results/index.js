const DuckItem = require('../duck-item')

module.exports = function(ducks) {
    return `<section class="duck-results">
        <ul class="duck-results__ul">${ducks.map(duck => `<li class="duck-results__li">${DuckItem(duck)}</li>`).join('')}</ul>
    </section`
}