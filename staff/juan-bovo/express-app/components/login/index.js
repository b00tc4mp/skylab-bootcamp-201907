const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang) {
    return `<h1>${literals[lang].title}</h1>
        <form method="post" action="${path}">
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <button>Login</button>
        </form>
        <a href="">Go back</a>`
}