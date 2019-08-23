const literals = require('./i18n')
const { registerPath } = require('./config')

function Register(_name, _surname, _username, lang, handleError, gobackPath) {
    const { title, name, surname, username, password, repassword, submit, goback } = literals[lang]

    return `
    <section class="register">
            <h2 class="title"> ${title} </h2>
            <form class="register-form" action="${registerPath}" method="POST">
                <label class="register-form__label" >${name}</label>
                <input class="register-form__input" type="text" name="name" value="${_name || ''}" />

                <label class="register-form__label" >${surname}</label>
                <input class="register-form__input" type="text" name="surname" value="${_surname || ''}" />

                <label class="register-form__label" >${username}</label>
                <input class="register-form__input" type="email" name="username" value="${_username || ''}"/>

                <label class="register-form__label" >${password}</label>
                <input class="register-form__input" type="password" name="password" />

                <label class="register-form__label" >${repassword}</label>
                <input class="register-form__input" type="password" name="repassword" />
                <button class="register-form__button" type="submit">${submit}</button>
            </form>
            ${handleError !== undefined ? `<p class="alert" >${handleError}</p>` : ''}
            <a href="${gobackPath}">${goback}</a>
            </section>`
}
module.exports = Register