const literals = require('./i18n')
const { loginPath } = require('./config')


module.exports = function (session, gobackPath) {
    const { lang, handleError } = session
    const { title, username, password, goback } = literals[lang]
    console.log(handleError)
    return `<h1>${title}</h1>
    <form action="${loginPath}" method="POST">
    
        <label htmlFor="username">${username}</label>
        <input type="email" name="username" id="username" />

        <label htmlFor="password">${password}</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">${title}</button>
    </form>
    ${handleError !== undefined ? `<p>${handleError}</p>` : ''}
    <a href="${gobackPath}">${goback}</a>`
}

