function FavButton (id, selected) {
    return `<form method="post" action= "/toggle-favorite">
            <input type="hidden" name="id" value=${id}>
            <button class="button--fav">${selected ? '💜' : '💔'}</button>
    </form>`
}
module.exports = FavButton