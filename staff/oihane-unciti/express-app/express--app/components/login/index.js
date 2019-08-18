const literals = require('./i18n')
const { path, goBackPath } = require('./config')

module.exports = function (lang) {
    const { signIn, goBack, password } = literals[lang]

    return `<article class="login">
        <h1>${signIn}</h1>
            
                <form class="form-field" method="post" action="${path}">
                <label class="form__field">E-mail<input class="form__field" type="email" name="email" /></label>
                    <label class="form__field">${password}<input class="form__field" type="password" name="password" /></label>
                    <button>${signIn}</button>
                </form>
                <a href="${goBackPath}">${goBack}</a>
            </div>
                
    </article>`
    
   
}