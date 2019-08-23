module.exports = function (id, selected, res) {
    // return `<form method="post" action="/toggle-favorite">
    //         <input type="hidden" name="id" value="${id}" />
    //         <button>${selected ? '💜' : '💔'}</button>
    //     </form>`
    res.render('fav-button', {id, selected, res})
}