const literals = require('./i18n')
const { path, goBackPath } = require('./config')

function Register(lang) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    return `<h1 class="form-user form-user__header">${signUp}</h1>
        <form class="form-user" method="post" action="${path}">

            <label class="form-user__label">${name}</label>
                <input class="form-user__input" type="text" name="name" />

            <label class="form-user__label">${surname}</label>
                <input class="form-user__input" type="text" name="surname" />

            <label class="form-user__label">E-mail</label>
                <input class="form-user__input" type="email" name="email" />
                
            <label class="form-user__label">${password}</label>
                <input class="form-user__input" type="password" name="password" />

            <label class="form-user__label">${repassword}</label>
                <input class="form-user__input" type="password" name="repassword" />

            <button class="btn btn--form-user">${signUp}</button>
        </form>
        <a class="btn btn--back" href="${goBackPath}">${goBack}</a>`
}

module.exports = Register