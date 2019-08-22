const DuckItem = require('./duck-item')

module.exports = function(ducks, res) {
    // return `<ul>${ducks.map(duck => `<li>${DuckItem(duck)}</li>`).join('')}</ul>`
    res.render('duck-results', {ducks})
}