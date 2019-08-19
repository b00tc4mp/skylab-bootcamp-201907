const DuckItem = require('./duck-item')

function DuckResults(ducks) {
    return `<ul>${ducks.map(duck => `<li>${DuckItem(duck)}</li>`).join('')}</ul>`
}

module.exports = DuckResults