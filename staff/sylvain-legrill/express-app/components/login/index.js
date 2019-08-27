const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')


module.exports = function (error, email, lang) {
    const { signIn, goBack, password } = literals[lang]

    return `<section class="login">
        <h1 class="login__title">${signIn}</h1>
        <form method="post" action="${path}">
            <ul class="login__list">
                <li class="login__item">
                    <label">E-mail<input class="login__input" type="email" name="email" value="${email ? email : ''}" /></label>
                </li>
                <li  class="login__item">
                    <label>${password}<input class="login__input" type="password" name="password" /></label>
                </li>
                <li  class="login__item">
                    <button class="login__button">${signIn}</button>
                </li>
            </ul>
        </form>
        ${error ? Feedback(error, 'error') : ''} 
        <a class="login__link" href="${goBackPath}">${goBack}</a>
        </section>`
}