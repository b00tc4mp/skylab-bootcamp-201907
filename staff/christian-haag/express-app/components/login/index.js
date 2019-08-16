const literals = require('./i18n')
const { path } = require('./config')

module.exports = function (lang) {
    return `<h1>${literals[lang].title}</h1>
    <form action="${path}" method="POST">
    
        <label htmlFor="username">${literals[lang].username}</label>
        <input type="email" name="username" id="username" />

        <label htmlFor="password">${literals[lang].password}</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">${literals[lang].title}</button>
    </form>
    <a href=">${literals[lang].goback}</a>`
}

