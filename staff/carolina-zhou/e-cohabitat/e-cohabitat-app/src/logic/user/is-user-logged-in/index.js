function isUserLoggedIn() {
    return !!(sessionStorage.token && sessionStorage.id)
}

export default isUserLoggedIn