
function LanguageSelector() {

    return `<form id="lang" method="POST" action="/language-selector">
            <select name="language" form="lang">
                <option name="english" value="english">English</option>
                <option name="espaniol" value="espaniol">Español</option>
                <option name="catala" value="catala">Catala</option>
            
            </select>
            <input type="submit" value="Send">
        </form>`
        
}

module.exports = LanguageSelector