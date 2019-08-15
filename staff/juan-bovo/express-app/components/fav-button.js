function FavButton({ active }) {
    return `<button>${active ? '💜' : '💔'}</button>`
}

module.exports = FavButton