function isUserLogged(){
    return sessionStorage.token && sessionStorage.id
}

export default isUserLogged