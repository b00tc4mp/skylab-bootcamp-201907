const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const feedback = require('../feedback')

module.exports = function (lang, error) {
    const { signIn, goBack, password } = literals[lang]

    return `<section class="login">
        <h1 class="login__title">${signIn}</h1>
        <form method="post" action="${path}">
            <ul class="login__list">
                <li class="login__item">
                    <label"><input class="login__input" type="email" placeholder="E-mail" name="email" /></label>
                </li>
                <li  class="login__item">
                    <label><input class="login__input" type="password"  placeholder="${password}" name="password" /></label>
                </li>
                <li  class="login__item">
                    <button class="login__button">${signIn}</button>
                </li>
            </ul>
        </form>
        <p>${(error && feedback(error)) || " "}</p>
        <a class="login__link" href="${goBackPath}">${goBack}</a>
        </section>`
}