module.exports = function (id, selected) {
    return `<form  method="post" action="/toggle-favorite">
            <input type="hidden" name="id" value="${id}" />
            <button class="favorites">${selected ? `<i class="fas fa-heart"></i>` : `<i class="far fa-heart"></i>`}</button>
        </form>`
}