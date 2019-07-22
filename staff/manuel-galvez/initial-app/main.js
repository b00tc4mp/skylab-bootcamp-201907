/* Data */
var users = [];
/* Panels */
var landingPanel = document.querySelector('.landing');
var registerPanel = document.querySelector('.register');
var loginPanel = document.querySelector('.login');
var registeredPanel = document.querySelector('.registered');
var homePanel = document.querySelector('.home');
var homeTitle = document.querySelector('.home__title');

/* Links */
var registerLink = document.querySelector('.btn__register');
var loginLink = document.querySelector('.btn__login');
var registerBack = document.querySelector('.register__back');
var loginBack = document.querySelector('.login__back');
var loginRegisteredLink = document.querySelector('.registered__login');
/* Forms */
var registerForm = document.querySelector('.register__form');
var loginForm = document.querySelector('.login__form');


/* Event Listeners */
loginLink.addEventListener('click', displayLogin)
registerLink.addEventListener('click', displayRegister)
loginBack.addEventListener('click', displayLanding)
registerBack.addEventListener('click', displayLanding)
registerForm.addEventListener('submit', submitRegister)
loginForm.addEventListener('submit', submitLogin)
loginRegisteredLink.addEventListener('click', displayLogin)


function displayLanding(event) {

    event.preventDefault()

    var parent = event.target.parentElement
    parent.classList.add('panel--hide');
    parent.classList.remove('panel--show');

    landingPanel.classList.add('panel--show');
    landingPanel.classList.add('panel--hide');
}

function submitRegister(event) {

    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    users.push({
        name: name,
        surname: surname,
        email: email,
        password: password
    })

    registerPanel.classList.add('panel--hide')
    registerPanel.classList.remove('panel--show')
    registeredPanel.classList.add('panel--show')
    registeredPanel.classList.add('panel--hide')


}

function submitLogin(event) {

    var email = event.target.email.value;
    var password = event.target.password.value;
    console.log(email, password)

    debugger;
    users.forEach(function(user) {
        if (user.email === email && user.password === password) {
            loginPanel.classList.add('panel--hide')
            loginPanel.classList.remove('panel--show')
            homePanel.classList.add('panel--show')
            homePanel.classList.remove('panel--hide')
            homeTitle.textContent = 'Welcome, ' + user.name + ' ' + user.surname
        }
    });

} 

function displayRegister(event) {

    event.preventDefault()

    var container = document.querySelector('.container');
    container.children[0].classList.add('panel--hide')
    container.children[0].classList.remove('panel--show')
    container.children[1].classList.add('panel--show')
    container.children[1].classList.remove('panel--hide')
}

function displayLogin(event) {

    event.preventDefault()

    var parentPanel = event.target.parentElement
    parentPanel.classList.add('panel--hide')
    parentPanel.classList.remove('panel--show')
    loginPanel.classList.add('panel--show')
    loginPanel.classList.remove('panel--hide')
}

