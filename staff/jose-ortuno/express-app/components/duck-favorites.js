const DuckDetail = require('./duck-detail')

module.exports = function(ducks) {
    return ducks ?  `<ul>${ducks.map(duck => `<li>${DuckDetail(duck)}</li>`).join('')}</ul>` : `There are not favorites`
}