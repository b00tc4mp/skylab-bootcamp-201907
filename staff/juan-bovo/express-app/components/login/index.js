const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require("../feeback")

module.exports = function (lang, error) {
    const { signIn, goBack, email, password } = literals[lang]

    return `<article class="login">
        <h2 class="form__title">${signIn}</h2>
            
                <form class="form" method="post" action="${path}">
                    <label class="form__label">E-mail<input class="form__text-field" type="email" name="email"/></label>
                    <label class="form__label">${password}<input class="form__text-field" type="password" name="password" /></label>
                    <button class="form__button">${signIn}</button>
                </form>
                ${error ? Feedback(error) : ''}
                <a class="form__back-link" href="${goBackPath}">${goBack}</a>
            </div>
                
    </article>`

    
   
}