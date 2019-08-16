function FavButton(favorite, duckId) {
    return `<form method="post" action="/onToggle">
            <input type="hidden" name="duckId" value=${duckId}>
            <button>${favorite ? '💜' : '💔'}</button> 
            </form>`
}

module.exports = FavButton