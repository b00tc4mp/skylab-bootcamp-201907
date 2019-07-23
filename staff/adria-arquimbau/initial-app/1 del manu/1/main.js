'use strict';

/**
 * Presentation // part visual de la web app on hi lleném el funcionament de logic i data (busines i data)
 */

//variable per reconeixer els panels, tots els panels tenen el mateix
var panels = document.getElementsByClassName('panel'); //a cada panel aplicantli un index podem dir quin panel ens referim

/*------------------------------ INITIAL PANEL 0----------------------------------------------------------------------------*/
// initial panel
var initialPanel = panels[0]; //es refereix a tot el panel en general, provar sempre a ficar a consola per veure-ho
var registerLink = initialPanel.children[0]; //dins de initialPanel variable es refereix al primer indice que es register
var loginLink = initialPanel.children[1]; //dins de initialPanel variable es refereix al segon indice que es register

registerLink.addEventListener('click', function (event) {//on va el boto register
    event.preventDefault();//quan fem un submit la pagina es refresca, aixo fa que no pasi

    //mostrem o treiem el mateix i seguent panel
    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});

loginLink.addEventListener('click', function (event) {//on va el boto link
    event.preventDefault();

    //mostrem o treiem el mateix i seguent panel
    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

/*--------------------------- REGISTER PANEL 1-------------------------------------------------------------------------------*/
// register panel
var registerPanel = panels[1];// posicio del panel
var registerBackLink = registerPanel.children[2];//posicio del backlink dins el panel

registerBackLink.addEventListener('click', function (event) { //funcio boto back
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});


var registerForm = registerPanel.children[0]; //quin panel es el de registerform

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    //convertim en var tota la info del form
    //dins del html estem en el scope del formulari i el name.value el detecta del id de cada valor i laplica
    var name = event.target.name.value; 
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        register(name, surname, email, password); //funcio que esta a logic del registre
        /* sinicia funcio register amb els aprametres i si hi ha error el llença perque el catch el pugi capturar*/ 

        //canvi de register panel a register succes
        registerPanel.classList.remove('panel--show');
        registerPanel.classList.add('panel--hide');

        registerSuccessPanel.classList.remove('panel--hide');
        registerSuccessPanel.classList.add('panel--show');
    } catch (error) {
        var registerFeedback = registerPanel.children[1]; // variable del erro de register
        registerFeedback.innerText = error.message;
    }
});

/*-------------------------------------REGISTER SUCCES PANEL 2---------------------------------------------------------------------*/
// register success panel
var registerSuccessPanel = panels[2];//POSICIO DEL PANEL
var registerSuccessLoginLink = registerSuccessPanel.children[0];// posicio del boto per anar a login

registerSuccessPanel.addEventListener('click', function (event) {//al anar a boto de login canviar a panel login
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

/*------------------------------------LOGIN PANEL 3----------------------------------------------------------------------*/
// login panel
var loginPanel = panels[3];//NUM DEL PANEL
var loginBackLink = loginPanel.children[2]; //posicio del back buton

loginBackLink.addEventListener('click', function (event) { //canvi de panel en cas d epinxar buto back
    event.preventDefault();

    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var loginForm = loginPanel.children[0]; //posicio del formulari del login

loginForm.addEventListener('submit', function (event) {// en cas de clickar a submit de form del login
    event.preventDefault();

    //valors de dades del form de login
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password);//funcio que esta a login per login de usuari

        //canvi a panel welcome en cas de funcio login correcte
        loginPanel.classList.remove('panel--show');
        loginPanel.classList.add('panel--hide');

        welcomePanel.classList.remove('panel--hide');
        welcomePanel.classList.add('panel--show');
    } catch(error) {
        var loginFeedback = loginPanel.children[1]; // posicio del parametre html buit per imprimir error
        loginFeedback.innerText = error.message;
    }
});

/*------------------------------------PANEL WELCOME 4----------------------------------------------------------------------*/
//welcome panel
var welcomePanel = panels[4];
var welcomeBack = welcomePanel.children[1]; //posicio boto back

welcomeBack.addEventListener('click', function (event) { 
    event.preventDefault(); 
     
    welcomePanel.classList.remove('panel--show');
    welcomePanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});