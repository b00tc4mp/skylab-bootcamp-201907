const { path } = require('./config')

module.exports = function () {

    return `<ul class="lang_selector">
                <li>
                    <form method='POST' action="${path}">
                        <input type=''hidden name='lang' value='en'>
                        <button>🇬🇧</button>
                    </form>
                </li>
                <li>
                    <form method='POST' action="${path}">
                        <input type=''hidden name='lang' value='es'>
                        <button>🇪🇸</button>
                    </form>
                </li>
                <li>
                    <form method='POST' action="${path}">
                        <input type=''hidden name='lang' value='ca'>
                        <button>🇿🇼</button>
                    </form>
                </li>
                <li>
                    <form method='POST' action="${path}">
                        <input type=''hidden name='lang' value='fr'>
                        <button>🇫🇷</button>
                    </form>
                </li>
            </ul>`
}
