const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang, view) {
    const { title, email, password, back } = literals[lang]
    return `<h1>${title}</h1>
        <form method="post" action="${path}">
            <label>${email}<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password" /></label>
            <button>${title}</button>
        </form>
        <a href="${view}">${back}</a>`
}