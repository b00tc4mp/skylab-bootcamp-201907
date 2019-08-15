function FavButton(active, duckId) {
    return `<form method="POST" action="/toggle-fav-duck">
                <input type="hidden" name="duckId" value=${duckId} />
                <button>${active ? '💜' : '💔'}</button>
            </form>`
}

module.exports = FavButton