const literals = require('./i18n')
const { path, goBackPath } = require('./config')

function Register(lang) {
    const{title, password, surname, name, email, repassword, goBack} = literals[lang]
    return `<section class="formSign--register">
        <h1 class="formSign--title">${title}</h1>
        <form class="formSign--form" method="post" action="${path}">
            <label class="formSign--label">${name}<input class="formSign--input" type="text" name="name" /></label>
            <label class="formSign--label">${surname}<input class="formSign--input" type="text" name="surname" /></label>
            <label class="formSign--label">${email}<input class="formSign--input" type="email" name="email" /></label>
            <label class="formSign--label">${password}<input class="formSign--input" type="password" name="password"/></label>
            <label class="formSign--label">${repassword}<input class="formSign--input" type="password" name="repassword" /></label>
            <button class="formSign--button">${title}</button>
        </form>
        <a class="formSign--goback" href="${goBackPath}">${goBack}</a>
    </section>`
}

module.exports = Register



