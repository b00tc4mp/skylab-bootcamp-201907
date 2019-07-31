// landing

const landing = new Landing(document.querySelector('.landing'))

landing.onNavigateToRegister(() => {
  landing.hide()
  register.show()
})

landing.onNavigateToLogin(() => {
  landing.hide()
  login.show()
})
// register

const register = new Register(document.querySelector('.register'))

register.onSubmitRegister((name, surname, email, password) => {
  try {
    logic.register(name, surname, email, password)

    register.hide()
    registerSuccess.show()
  } catch (error) {
    register.showFeedback(error.message)
  }
})

register.onNavigateBack(() => {
  register.hide()
  landing.show()
})

// register success

const registerSuccess = new RegisterSuccess(
  document.querySelector('.register-success')
)

registerSuccess.onNavigateToLogin(() => {
  registerSuccess.hide()
  login.show()
})

// login

const login = new Login(document.querySelector('.login'))

login.onNavigateBack(() => {
  login.hide()
  landing.show()
})

login.onSubmitLogin((name, email) => {
  try {
    logic.login(name, email)
    login.hide()
    console.log('hola buenas')
    home.show()
  } catch (error) {
    login.showFeedback(error.message)
  }
})

// home

const home = new DuckHome(document.getElementsByClassName('duck-home')[0])

home.onClickLogout(() => {
  home.hide()
  landing.show()
})

home.showFavorites(() => {
  home.favs.listItems(users[0].favorites)
  home.favs.show()
  home.results.hide()
})

home.search.onSearch(query => {
  logic.searchDucks(query, ducks => {
    home.results.listItems(ducks)
    home.results.show()
    home.favs.hide()
  })
})

// Display Duck

home.results.onClickItem = id => {
  logic.retrieveDuck(id, duck => {
    home.results.hide()
    home.detail.displayDuck(duck)
    home.detail.show()
  })
}

home.detail.onNavigateBack(() => {
  home.detail.hide()
  home.results.show()
})

home.detail.toggleFavorite(id => {
  logic.favorite(id)
})
