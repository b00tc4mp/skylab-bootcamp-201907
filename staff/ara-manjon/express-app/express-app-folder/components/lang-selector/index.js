const {pathLang}= require('./config')

function LangSelector(lang){
    
    return `<div class= "dropdown-content"><ul class= "lang-ul">

    <li class= "lang-list">
        <form class= "lang-form" method="post" action="${pathLang}">
            <input class= "lang-input" type="hidden" name="lang" value="en">
            <button class= "lang-button" >EN</button>
        </form>
    </li>
    <li class= "lang-list">
        <form class= "lang-form" method="post" action="${pathLang}">
            <input class= "lang-input" type="hidden" name="lang" value="es">
            <button class= "lang-button">ES</button>
        </form>
    </li>
    <li class= "lang-list">
        <form class= "lang-form" method="post" action="${pathLang}">
            <input class= "lang-input" type="hidden" name="lang" value="ca">
            <button class= "lang-button">CA</button>
        </form>
    </li>
    <li class= "lang-list">
        <form class= "lang-form" method="post" action="${pathLang}">
            <input class= "lang-input" type="hidden" name="lang" value="fr">
            <button class= "lang-button">FR</button>
        </form>
    </li>
    
</ul></div>`
}

module.exports = LangSelector

