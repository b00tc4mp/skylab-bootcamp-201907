const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const feedback = require('../feedback')

function Register(lang, error) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    return `<section class="register">
        <h1 class="register__title">${signUp}</h1>
        <form method="post" action="${path}">
            <ul class="register__list">
                <li class="register__item">
                    <label><input class="register__input" type="text" placeholder="${name}" name="name" /></label>
                </li>
                <li class="register__item">
                    <label><input class="register__input" type="text" placeholder="${surname}" name="surname" /></label>
                </li>
                <li class="register__item">
                    <label><input class="register__input" type="email" placeholder="E-mail" name="email" /></label>
                </li>
                <li class="register__item">
                    <label><input class="register__input" type="password" placeholder="${password}" name="password" /></label>
                </li>
                <li class="register__item">
                    <label><input class="register__input" type="password" placeholder="${repassword}" name="repassword" /></label>
                </li>
                <li class="register__item">
                    <button class="register__button">${signUp}</button>
                </li>
            </ul>
        </form>
        <p>${(error && feedback(error)) || " "}</p>
        <a class="register__link" href="${goBackPath}">${goBack}</a>
        </section>`
}

module.exports = Register