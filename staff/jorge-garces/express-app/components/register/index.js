const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const LangSelector = require('../lang-selector')
const Feedback = require('../feedback')

function Register(lang, error) {
    const { title, name, surname, password, repassword, back } = literals[lang]

    return `
    <section class='landing'>
            <section class='wrapper'>
                ${LangSelector()}
            </section>

            <div class='logoGreet'>
                <h1>Express Ducks</h1>
            </div>
            
            <h1>${title}</h1>
            <section class='search_wrapper'>
                <form method="post" class='form' action="${path}">
                    <label><input type="text" name="name" placeholder='${name}'/></label>
                    <label><input type="text" name="surname" placeholder='${surname}'/></label>
                    <label><input type="email" name="email" placeholder='e-mail'/></label>
                    <label><input type="password" name="password" placeholder='${password}'/></label>
                    <label><input type="password" name="repassword" placeholder='${repassword}'/></label>
                    <button>${title}</button>
                    <a href="${goBackPath}"><i class="fas fa-arrow-left fa-5x"></i></a>
                </form>  
            </section>   
        </section>
    </section>
        
        ${error ? `${Feedback(lang, error)}` : ''}`
}

module.exports = Register