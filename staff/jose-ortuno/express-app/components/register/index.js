const literals = require('./i18n')
const { path } = require('./config')
const Feedback = require('../feedback')

module.exports = function (lang, view, error) {
    const { title, name, surname, email, password, repassword, back } = literals[lang]

    return `<section class="register">
        <h2>${title}</h2>
        <form method="post" action="${path}">
            <label for="name">${name}</label>
            <input type="text" name="name" placeholder="${name}" />
            <label for="surname">${surname}</label>
            <input type="text" name="surname" placeholder="${surname}" />
            <label for="email">${email}</label>
            <input type="email" name="email" placeholder="${surname}" />
            <label for="password">${password}</label>
            <input type="password" name="password" placeholder="${surname}" />
            <label for="repasword">${repassword}</label>
            <input type="password" name="repassword" placeholder="${surname}" />
            <button>${title}</button>
        </form>
        ${error ? Feedback(error) : ''}
        <a class="class="back" href="${view}">${back}</a>
    </section>`
}