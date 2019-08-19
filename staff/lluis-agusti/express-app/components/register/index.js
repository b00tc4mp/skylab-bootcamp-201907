const literals = require('./i18n')
const { path, goBackPath } = require('./config')

function Register(lang) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    return `<section class="register">
        <h1 class="register__title">${signUp}</h1>
        <form method="post" action="${path}">
            <ul class="register__list">
                <li class="register__item">
                    <label>${name}<input class="register__input" type="text" name="name" /></label>
                </li>
                <li class="register__item">
                    <label>${surname}<input class="register__input" type="text" name="surname" /></label>
                </li>
                <li class="register__item">
                    <label>E-mail<input class="register__input" type="email" name="email" /></label>
                </li>
                <li class="register__item">
                    <label>${password}<input class="register__input" type="password" name="password" /></label>
                </li>
                <li class="register__item">
                    <label>${repassword}<input class="register__input" type="password" name="repassword" /></label>
                </li>
                <li class="register__item">
                    <button class="register__button">${signUp}</button>
                </li>
            </ul>
        </form>
        <a class="register__link" href="${goBackPath}">${goBack}</a>
        </section>`
}

module.exports = Register