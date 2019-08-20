function FavButton (active) {
    return `<button action= "/onToggle">
    ${active ? '💜' : '💔'}</button>`
}
module.exports = FavButton