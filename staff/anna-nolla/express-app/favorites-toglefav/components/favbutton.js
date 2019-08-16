function FavButton (active, duckId, path) {
    return `<form method="POST" action= "/onToggle">
            <input type="hidden" name="duckId" value=${duckId}>
            <input type="hidden" name="path" value=${path}>
            <button>
    ${active ? '💜' : '💔'}</button>
    </form>`
}
module.exports = FavButton