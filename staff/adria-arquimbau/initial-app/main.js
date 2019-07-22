var panels = document.getElementsByClassName('panel');

//initial panel

var initialPanel = panels;

var register = initialPanel.children[0];
var login = initialPanel.children[1];

register.addEventListener('click',function(event){
    event.preventDefault();
    //TODO hide initial panel, show register panel

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});



login.addEventListener('click',function(event){
    event.preventDefault();
    //TODO hide initial panel, show register panel

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

var registerPanel = panels[1];

var registerBackLink = registerPanel.Children[1];
var loginPanel = panels[3];




/*variables
var inicio = document.getElementById("ini");
var register = document.getElementById("register");
var registerOk = document.getElementById("register_ok");
var login = document.getElementById("login");
var welcome = document.getElementById("welcome");

//iniciamos con todo desconectado en oculto
var inicioON = inicio.style.display = "none";
register.style.display = "none";
registerOk.style.display = "none";
login.style.display = "none";
welcome.style.display = "none";

inicioON();

function inicioON() {
    inicioOn = inicio.style.display = "block";
}

function registerON() {
    inicio.style.display = "none";
    register.style.display = "block";
}

function registerOKON() {
    registerOk.style.display = "value";
    register.style.display = "none";
}

function loginON() {
    login.style.display = "value";
    registerOk.style.display = "none";
}

function welcomeON() {
    welcome.style.display = "value";
    login.style.display = "none";
}*/