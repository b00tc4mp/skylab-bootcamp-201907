module.exports = function (id, selected) {
    return `<form method="post" action="/toggle-favorite">
            <input type="hidden" name="id" value="${id}" />
            <button class='fav-button'>${selected ? '💜' : '💔'}</button>
        </form>`
}