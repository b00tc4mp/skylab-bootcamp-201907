const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require("../feeback")


function Register(lang, error) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    return `<h2 class="form__title">${signUp}</h2>
        <form class="form" method="post" action="${path}">
            <label class="form__label">${name}<input class="form__text-field" type="text" name="name" /></label>
            <label class="form__label">${surname}<input class="form__text-field" type="text" name="surname" /></label>
            <label class="form__label">E-mail<input class="form__text-field" type="email" name="email" /></label>
            <label class="form__label">${password}<input class="form__text-field" type="password" name="password" /></label>
            <label class="form__label">${repassword}<input class="form__text-field" type="password" name="repassword" /></label>
            <button class="form__button">${signUp}</button>
        </form>
        ${(error && Feedback(error)) || ''}
        <a class="form__back-link" href="${goBackPath}">${goBack}</a>`
}

module.exports = Register