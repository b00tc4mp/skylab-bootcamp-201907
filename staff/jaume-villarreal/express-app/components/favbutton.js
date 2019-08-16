function FavButton (favorite, duckId , pathName) {
    return `<form method="post" action= "/onToggle">
            <input type="hidden" name="duckId" value=${duckId}>
            <input type="hidden" name="pathname" value=${pathName}>
            <button>${favorite ? '💜' : '💔'}</button>
    </form>`
}
module.exports = FavButton