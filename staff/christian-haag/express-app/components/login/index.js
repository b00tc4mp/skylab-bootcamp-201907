const literals = require('./i18n')
const { loginPath } = require('./config')


module.exports = function (session, gobackPath) {
    const { lang, handleError } = session
    const { title, username, password, goback } = literals[lang]

    return `
    <section class="login">
    <h1 class="title" >${title}</h1>
    <form class="login-form" action="${loginPath}" method="POST">
    
        <label class="login-form__label" htmlFor="username">${username}</label>
        <input class="login-form__input" type="email" name="username" id="username" />

        <label class="login-form__label" htmlFor="password">${password}</label>
        <input class="login-form__input" type="password" name="password" id="password"/>
        <button class="login-form__button" type="submit">${title}</button>
    </form>
    ${handleError !== undefined ? `<p class="alert">${handleError}</p>` : ''}
    <a href="${gobackPath}">${goback}</a>
    </section>`
}

