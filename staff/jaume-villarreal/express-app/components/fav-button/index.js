module.exports = function (id, selected) {
    return `<form  class="form-fav" method="post" action="/toggle-favorite">
            <input type="hidden" name="id" value="${id}" />
            <button class="form-fav__btn">${selected ? '💜' : '💟'}</button>
        </form>`
}