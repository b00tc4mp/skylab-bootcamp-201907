import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUser from './retrieve-user'
import searchRecipe from './search-recipe-category'
import retrieveRecipe from './retrieve-recipe'
import registerDay from './register-day'
import retrieveCurrentWeek from './retrieve-current-week'

export default {
  set __token__(token) {
    sessionStorage.token = token
  },

  get __token__() {
    return sessionStorage.token
  },

  registerUser,
  authenticateUser,
  isUserLoggedIn,
  logUserOut,
  retrieveUser,
  searchRecipe,
  retrieveRecipe,
  registerDay,
  retrieveCurrentWeek
}