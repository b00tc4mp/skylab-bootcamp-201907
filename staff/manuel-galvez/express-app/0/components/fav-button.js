function FavButton(active, duckId) {
    return `<form method="POST" action="/toggle-favorite">
                <input type="hidden" name="duckId" value=${duckId} />
                <button>${active ? '💜' : '💔'}</button>
            </form>`
}

module.exports = FavButton