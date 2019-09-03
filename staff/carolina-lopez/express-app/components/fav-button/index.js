module.exports = function (id, selected) {
  return `
    <form method='post' action='/toggle-favorite'>
    <input type='hidden' name='id' value="${id}" />
    <button>
    ${selected ? '💜' : '💔'}</button>
    </form>
    `
}

