// function user(name, surname, email, password) {
//     this.name = name;
//     this.surname = surname;
//     this.email = email;
//     this.password = password;
// }

var user = [];
var userLog = [];

var panels = document.getElementById('panel');

// DOM Elements
var landing = panels.children[1];
var registerLink = landing.children[1];
var loginLink = landing.children[2];

var register = panels.children[2];
var registerForm = register.children[1];
var backLinkReg = register.children[2];

var registered = panels.children[3];
var registeredInfo = registered.children[1]
var registeredLink = registeredInfo.children[0];

var login = panels.children[4];
var loginForm = login.children[1];
var backLinkLog = login.children[2];

var welcome = panels.children[5];

// EVENTS
// Initial panel
/**
 * NAV: Landing --> Register
 */
registerLink.addEventListener('click', function(event) {
    event.preventDefault();

    landing.classList.remove('panel--show');
    landing.classList.add('panel--hide');

    register.classList.remove('panel--hide');
    register.classList.add('panel--show');
})
/**
 * NAV: Landing --> Login
 */
loginLink.addEventListener('click', function(event) {
    event.preventDefault();

    landing.classList.remove('panel--show');
    landing.classList.add('panel--hide');

    login.classList.remove('panel--hide');
    login.classList.add('panel--show');
})

// Register page
/**
 * NAV: Register --> Landing
 */
backLinkReg.addEventListener('click', function(event) {
    event.preventDefault()

    register.classList.remove('panel--show');
    register.classList.add('panel--hide');

    landing.classList.remove('panel--hide');
    landing.classList.add('panel--show');
})

/**
 * GET: data users
 * NAV: Register --> Registered
 */
registerForm.addEventListener('submit', function(event) {
    event.preventDefault()

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;
    
    user.push({
        name: name,
        surname: surname,
        email: email,
        password: password
    })

    register.classList.remove('panel--show');
    register.classList.add('panel--hide');

    registered.classList.remove('panel--hide');
    registered.classList.add('panel--show');
})

// Registered page
/**
 * NAV: Registered --> Login
 */
registeredLink.addEventListener('click', function(event) {
    event.preventDefault();

    registered.classList.remove('panel--show');
    registered.classList.add('panel--hide');

    login.classList.remove('panel--hide');
    login.classList.add('panel--show');
})

// Login page
/**
 * NAV: Login --> Landing
 */
backLinkLog.addEventListener('click', function(event) {
    event.preventDefault()

    login.classList.remove('panel--show');
    login.classList.add('panel--hide');

    landing.classList.remove('panel--hide');
    landing.classList.add('panel--show');
})

/**
 * BEHAVIOR: Check if the user exists.
 * NAV: Login --> Welcome page
 */
loginForm.addEventListener('submit', function(event) {
    event.preventDefault()

    var email = event.target.email.value;
    var password = event.target.password.value;
    // debugger
    user.forEach(function(element, index, array) {
        if (element.email === email && element.password === password) {
            userLog.push({
                email: email,
                password: password
            })
        
            login.classList.remove('panel--show');
            login.classList.add('panel--hide');
        
            welcome.classList.remove('panel--hide');
            welcome.classList.add('panel--show');
        } else {
            alert('Sorry! Password or Email is not correct. Try again!');
        }
    });
})

