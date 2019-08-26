const DuckItem = require('../duck-item')

module.exports = function (ducks) {
    return `
    <section class='landing'>
        <ul class='result_wrapper'>${ducks.map(duck => `<li>${DuckItem(duck)}</li>`).join('')}</ul>
    </section>
    `
}