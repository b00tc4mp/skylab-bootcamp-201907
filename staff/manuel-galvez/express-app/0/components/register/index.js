const locale = require('./i18n')
const { path, goBackPath } = require('./config')

function Register(lang) {
    const { title, name, surname, password, repassword, goback } = locale[lang]

    return `<h1>${title}</h1>
        <form class="register__form form" method="post" action="${path}">
            <label for="register-name">${name}</label>
            <input class="register__input register__name form__input" id="register-name" type="text" name="name" />
            <label for="register-surname">${surname}</label>
            <input class="register__input register__name form__input" id="register-surname" type="text" name="surname" />
            <label for="register-email">E-mail</label>
            <input class="register__input register__name form__input" id="register-email" type="email" name="email" />
            <label for="register-password">${password}</label>
            <input class="register__input register__name form__input" id="register-password" type="password" name="password" />
            <label for="register-repassword">${repassword}</label>
            <input class="register__input register__name form__input" id="register-repassword" type="password" name="repassword" />
            <button class="register__submit btn btn--primary">${title}</button>
            <a class="register__back btn btn--secondary" href="${goBackPath}">${goback}</a>
        </form>`
}

module.exports = Register