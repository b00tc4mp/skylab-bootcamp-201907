function FavButton (favorite, duckId) {
    return `<form method="POST" action= "/onToggle">
            <input type="hidden" name="duckId" value=${duckId}>
            <button>
    ${favorite ? '💜' : '💔'}</button>
    </form>`
}
module.exports = FavButton