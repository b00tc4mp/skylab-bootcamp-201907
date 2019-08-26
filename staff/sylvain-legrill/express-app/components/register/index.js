const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

module.exports = function (error, name, surname, email, lang) {
    const { signUp, name: _name, surname: _surname, goBack,  password, repassword, } = literals[lang]

    return `<section class="register">
        <h1 class="register__title">${signUp}</h1>
        <form method="post" action="${path}">
            <ul class="register__list">
                <li class="register__item">
                    <label>${_name}<input class="register__input" type="text" name="name" value="${name ? name : ''}" /></label>
                </li>
                <li class="register__item">
                    <label>${_surname}<input class="register__input" type="text" name="surname" value="${surname ? surname : ''}" /></label>
                </li>
                <li class="register__item">
                    <label>E-mail<input class="register__input" type="email" name="email" value="${email ? email : ''}" /></label>
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
        ${error ? Feedback(error, 'error') : ''}
        <a class="register__link" href="${goBackPath}">${goBack}</a>
        </section>`
}