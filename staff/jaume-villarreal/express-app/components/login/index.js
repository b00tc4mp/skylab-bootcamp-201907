const literals = require('./i18n')
const { path, goBackPath } = require('./config')

module.exports = function (email , _password , lang ,  error) {
    const { signIn, goBack, password } = literals[lang]
    
    return `<h1 class="form-user form-user__header">${signIn}</h1>
        <form class="form-user" method="post" action="${path}">
            <label class="form-user__label">E-mail</label>
                <input class="form-user__input" type="email" name="email" value="${email || ''}"/>

            <label class="form-user__label">${password}</label>
                <input class="form-user__input" type="password" name="password" value="${_password || ''}"/>
            
            <button class="btn btn--form-user">${signIn}</button>
        </form>
        <a class="btn btn--back" href="${goBackPath}">${goBack}</a>
        
        ${error && `<p class = "feedback">${error}</p>` || `<span></span>`}`
}