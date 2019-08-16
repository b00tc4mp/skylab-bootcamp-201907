function FavButton (duckId, selected) {
    return `<form method="post" action= "/toggle-favorite">
            <input type="hidden" name="duckId" value=${duckId}>
            <button>${selected ? '💜' : '💔'}</button>
    </form>`
}
module.exports = FavButton