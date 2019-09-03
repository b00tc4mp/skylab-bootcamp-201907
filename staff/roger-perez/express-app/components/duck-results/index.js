const DuckItem = require('../duck-item')

module.exports = function(ducks) {
    return `<section class="duck-results">
        <ul class="duck-results__list">${ducks.map(duck => `<li class="duck-results__item">${DuckItem(duck)}</li>`).join('')}</ul>
    </section`
}