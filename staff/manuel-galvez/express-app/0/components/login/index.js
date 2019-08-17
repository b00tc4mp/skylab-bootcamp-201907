const locale = require('./i18n')
const { path, goBackPath } = require('./config')

module.exports = function(lang) {
    return `<h1>${locale[lang].title}</h1>
        <form method="post" action="${path}">
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <button>Login</button>
        </form>
        <a href="${goBackPath}">${locale[lang].goback}</a>`
}