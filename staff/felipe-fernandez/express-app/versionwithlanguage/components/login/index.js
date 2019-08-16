const literals = require('./i18n')
const { path } = require('./config')

 function Login(lang) {
    const { password } = literals[lang]

    return `<h1>${literals[lang].title}</h1>
        <form method="post" action="${path}">
            <label>E-mail<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password" /></label>
            <button>Login</button>
        </form>
        <a href="">Go back</a>`
}

module.exports =Login