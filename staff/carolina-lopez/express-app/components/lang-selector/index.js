const { path } = require('./config')

module.exports = function (lang) {
  return `<ul class='ul lang-ul'>
      <li class='lang-li'>
          <form method="post" action="${path}">
              <input type="hidden" name="lang" value="en">
              <button class='button'>EN</button>
          </form>
      </li>
      <li class='lang-li'>
          <form method="post" action="${path}">
              <input type="hidden" name="lang" value="es">
              <button class='button'>ES</button>
          </form>
      </li>
      <li class='lang-li'>
          <form method="post" action="${path}">
              <input type="hidden" name="lang" value="ca">
              <button class='button'>CA</button>
          </form>
      </li>
      <li class='lang-li'>
          <form method="post" action="${path}">
              <input type="hidden" name="lang" value="fr">
              <button class='button'>FR</button>
          </form>
      </li>
    </ul>`
}