// function isUserLogIn(){
//     return sessionStorage.token
// }

// export default isUserLogIn

export default function () {
    return !!this.__token__
}