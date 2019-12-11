/**
 * Checks if a user is logged in.
 * 
 * @returns {Boolean} true (if user is logged in) or false (if user is not logged in)
 */

function isUserLoggedIn() {
    return !!(sessionStorage.token && sessionStorage.id)
}

export default isUserLoggedIn