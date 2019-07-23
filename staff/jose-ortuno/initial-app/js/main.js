'use strict';

/**
 * Presentation
 */

// DOM Elements
var panels = document.getElementById('panel');

var landing = panels.children[1];
var registerLink = landing.children[1];
var loginLink = landing.children[2];

var register = panels.children[2];
var registerForm = register.children[1];
var backLinkReg = register.children[3];

var registered = panels.children[3];
var registeredInfo = registered.children[1]
var registeredLink = registeredInfo.children[0];

var login = panels.children[4];
var loginForm = login.children[1];
var backLinkLog = login.children[3];

var welcome = panels.children[5];

// EVENTS
// Initial panel
/**
 * NAV: Landing --> Register
 */
registerLink.addEventListener('click', function(event) {
    event.preventDefault();
    
    nav(landing, register);
});
/**
 * NAV: Landing --> Login
 */
loginLink.addEventListener('click', function(event) {
    event.preventDefault();

    nav(landing, login);
});

// Register page
/**
 * NAV: Register --> Landing
 */
backLinkReg.addEventListener('click', function(event) {
    event.preventDefault()

    nav(register, landing);
});

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

    try {
        userRegister(name, surname, email, password);
        
        nav(register, registered);
    } catch (error) {
        var registerError = register.children[2];
        
        turnOn(registerError);
        registerError.innerText = error.message;
    }
});

// Registered page
/**
 * NAV: Registered --> Login
 */
registeredLink.addEventListener('click', function(event) {
    event.preventDefault();

    nav(registered, login);
});

// Login page
/**
 * NAV: Login --> Landing
 */
backLinkLog.addEventListener('click', function(event) {
    event.preventDefault();

    nav(login, landing);
});

/**
 * BEHAVIOR: Check if the user exists.
 * NAV: Login --> Welcome page
 */
loginForm.addEventListener('submit', function(event) {
    event.preventDefault()

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        userLogin(email, password);
        
        nav(login, welcome);
    } catch (error) {
        var loginError = login.children[2];
        
        turnOn(loginError);
        loginError.innerText = error.message;
    }
   
});

// TOOLS
/**
 * Function that allows desactivate a section of the DOM and activate another page.
 * 
 * @param {*} page Actual page
 * @param {*} exit Exit page
 */
function nav(page, exit) {
    page.classList.remove('panel--show');
    page.classList.add('panel--hide');

    exit.classList.remove('panel--hide');
    exit.classList.add('panel--show');

};

function turnOff(page) {
    page.classList.remove('panel--show');
    page.classList.add('panel--hide');
};

function turnOn(page) {
    page.classList.remove('panel--hide');
    page.classList.add('panel--show');
};

