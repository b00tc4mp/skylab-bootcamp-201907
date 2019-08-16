const literals = require('./i18n')
const { path } = require('./config')

function Register(lang) {
    return `
            <h2> ${literals[lang].title} </h2>
            <form action="${path}" method="POST">
                <label htmlFor="name">${literals[lang].name}</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="surname">${literals[lang].surname}</label>
                <input type="text" name="surname" id="surname" />

                <label htmlFor="username">${literals[lang].username}</label>
                <input type="email" name="username" id="username" />

                <label htmlFor="password">${literals[lang].password}</label>
                <input type="password" name="password" id="password" />
                
                <label htmlFor="password">${literals[lang].repassword}</label>
                <input type="password" name="repassword" id="repassword" />
                <button type="submit">${literals[lang].submit}</button>
            </form>
            <a href="">${literals[lang].goback}</a>`
}
module.exports = Register