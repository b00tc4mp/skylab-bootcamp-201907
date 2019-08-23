const literals = require('./i18n')
const { path, goBackPath } = require('./config')

module.exports = function (lang) {
    const { signIn, goBack, password } = literals[lang]

    return `<section class="login">
        <h1 class="login__title">${signIn}</h1>
        <form method="post" action="${path}">
            <ul class="login__list">
                <li class="login__item">
                    <label class="login__text">E-mail<input class="login__input" type="email" name="email" /></label>
                </li>
                <li  class="login__item">
                    <label class="login__text">${password}<input class="login__input" type="password" name="password" /></label>
                </li>
                <li  class="login__item">
                    <button class="login__button">${signIn}</button>
                </li>
            </ul>
        </form>
        <a class="login__link" href="${goBackPath}">${goBack}</a>
        </section>`
}