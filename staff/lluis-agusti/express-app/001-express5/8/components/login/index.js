const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang) {
    const { title, password, goback } = literals[lang]

    return `<h1>${title}</h1>
        <form method="post" action="${path}">
            <label>E-mail<input type="email" name="email" /></label>
<label>${password}<input type="password" name="password" /></label>
            <button>${login}</button>
        </form>
        <a href="">${goback}</a>`
}