const DuckItem= require('./duck-item')

function DuckResults(ducks) {
    return `<ul class="content">${ducks.map(duck=> `<li class="item">${DuckItem(duck)}</li>`).join('')}</ul>`
}

module.exports = DuckResults