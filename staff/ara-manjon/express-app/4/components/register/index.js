const literals = require('./i18n')
const { path } = require('./config')

function Register(lang) {
    const{title, password, surname, name, email, repassword, goBack} = literals[lang]
    return `<section>
        <h1>${title}</h1>
        <form method="post" action="${path}">
            <label>${name}<input type="text" name="name" /></label>
            <label>${surname}<input type="text" name="surname" /></label>
            <label>${email}<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password"/></label>
            <label>${repassword}<input type="password" name="repassword" /></label>
            <button>${title}</button>
        </form>
        <a href="">${goBack}</a>
    </section>`
}

module.exports = Register



