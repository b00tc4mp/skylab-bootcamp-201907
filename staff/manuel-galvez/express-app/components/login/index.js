const locale = require('./i18n')
const Feedback = require('../feedback')
const { path, goBackPath } = require('./config')

module.exports = function(lang, error) {
    const { title, login, goback, password } = locale[lang]
    return `<section class="login">
                <h1>${title}</h1>
                <form class="login__form form" method="post" action="${path}">
                    <label for="input-user">E-mail</label>
                    <input id="input-username" class="login__input login__email form__input" type="email" name="email" />
                    <label for="input-password">${password}</label>
                    <input class="login__input login__password form__input" type="password" name="password" /></label>
                    <button class="login__submit btn btn--primary">${login}</button>
                    <a class="login__back btn btn--secondary" href="${goBackPath}">${goback}</a>
                </form>
        ${error ? Feedback(error) : `<p></p>`}
        </section>`
}

