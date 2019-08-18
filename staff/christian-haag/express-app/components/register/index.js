const literals = require('./i18n')
const { registerPath } = require('./config')

function Register(lang, gobackPath) {
    const { name, surname, username, password, repassword, submit, goback } = literals[lang]
    return `
            <h2> ${literals[lang].title} </h2>
            <form action="${registerPath}" method="POST">
                <label htmlFor="name">${name}</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="surname">${surname}</label>
                <input type="text" name="surname" id="surname" />

                <label htmlFor="username">${username}</label>
                <input type="email" name="username" id="username" />

                <label htmlFor="password">${password}</label>
                <input type="password" name="password" id="password" />
                
                <label htmlFor="password">${repassword}</label>
                <input type="password" name="repassword" id="repassword" />
                <button type="submit">${submit}</button>
            </form>
            <a href="${gobackPath}">${goback}</a>`
}
module.exports = Register