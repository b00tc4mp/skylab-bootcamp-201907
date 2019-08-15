function FavButton(active, duckId) {
    return `<form method="POST" action="/${duckId}">
                <button>${active ? '💜' : '💔'}</button>
            </form>`
}

module.exports = FavButton
//<input type="hidden" name="duckId" value=${duckId} />