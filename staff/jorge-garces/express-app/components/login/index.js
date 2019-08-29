const { path, goBackPath } = require('./config')
const literals = require('./i18n')
const LangSelector = require('../lang-selector')

module.exports = function (lang) {

    const { title, password, login } = literals[lang]

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
                    <label><input type="email" name="email" placeholder='E-mail'/></label>
                    <label><input type="password" name="password" placeholder=${password} /></label>
                    <button>${login}</button>
                    <a href="${goBackPath}"><i class="fas fa-arrow-left fa-5x"></i></a>
                </form>
        </search>
            
    </section>`
}