module.exports = function (id, selected) {
    return `<form class="fav" method="post" action="/toggle-favorite">
            <input type="hidden" name="id" value="${id}" />
            <button>${selected ? `<i class="fas fa-heart-broken"></i>` : `<i class="fas fa-heart"></i>`}</button>
        </form>`
}