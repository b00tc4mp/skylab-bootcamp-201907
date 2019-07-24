'use strict';

/**
 * Presentation // part visual de la web app on hi lleném el funcionament de logic i data (busines i data)
 */

//variable per reconeixer els panels, tots els panels tenen el mateix
var panels = document.getElementsByClassName('panel'); //a cada panel aplicantli un index podem dir quin panel ens referim

/*------------------------------ INITIAL PANEL 0----------------------------------------------------------------------------*/
// initial panel
//creem una variable objecte constructor enllaçat al panels index 0, que es la posicio en html
var initialPanel = new InitialPanel(panels[0]); 

//nova funcio daquest object c. que es navegar a Register Panel
initialPanel.onNavigateToRegister(function (event) {
    event.preventDefault(); //perque no fagi recarga de pagina

    initialPanel.hide(); //funcio creada a components per canviar clase de panel i que no es vegi
    registerPanel.show(); //funcio creada a components per canviar clase de panel i que pasi a veureus
});

//nova funcio daquest object c. que es navegar a Login Panel
initialPanel.onNavigateToLogin(function (event) {
    event.preventDefault();

    initialPanel.hide();
    loginPanel.show();
});
//bastant facil, tenim les funcions que ens fan navegar a un panel o altre
//estan declarades a components

/*--------------------------- REGISTER PANEL 1-------------------------------------------------------------------------------*/
// register panel
//creem una variable objecte constructor enllaçat al panels index 1, que es la posicio en html
var registerPanel = new RegisterPanel(panels[1]);

//funcio daquest objecte que es anar enrera
registerPanel.onNavigateBack(function (event) {
    event.preventDefault();

    registerPanel.hide();//quin apaguem
    initialPanel.show();//quin encenem
});

//funcio de registre 
registerPanel.onRegisterSubmit(function (event) {
    event.preventDefault();

    //dins el form de html que esta enllaçat per index childran a components
    //treiem var de cada element del form
    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        //iniciem funcio de registre de logic.js
        //comproba fallos de caracters
        register(name, surname, email, password);

        //si no dona error apaga panel i mostra el seguent
        registerPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {
        //en cas de error ,capturen el typeError i el imprimim al children seguent
        var registerFeedback = registerPanel.container.children[1];

        registerFeedback.innerText = error.message;
    }
});

/*-------------------------------------REGISTER SUCCES PANEL 2---------------------------------------------------------------------*/
// register success panel
var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

//funcio per anar a login un cop registrat
registerSuccessPanel.onNavigateToLogin(function(event) {
    event.preventDefault();

    registerSuccessPanel.hide();
    loginPanel.show();
});

/*------------------------------------LOGIN PANEL 3----------------------------------------------------------------------*/
// login panel
//objete c. amb index 3 de panels
var loginPanel = new LoginPanel(panels[3]);

//funcio easy de anar enrera
loginPanel.onNavigateBack(function (event) {
    event.preventDefault();

    loginPanel.hide();
    initialPanel.show();
});

//funcio de logear i anar a welcome
loginPanel.onLoginSubmit(function (event) {
    event.preventDefault();

    //recuperem valors del form
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        //iniciem funcio login
        login(email, password);

        //en OK de login apagem panel iniciem welcome
        loginPanel.hide();
        welcomePanel.show();
    } catch (error) {
        //en cas de error capturem i imprimim
        var registerFeedback = loginPanel.container.children[1];

        registerFeedback.innerText = error.message;
    }
});

/*------------------------------------PANEL WELCOME 4----------------------------------------------------------------------*/
//welcome panel

var welcomePanel = new WelcomePanel(panels[4]);

//funcio easy de anar enrera
welcomePanel.onNavigateBack(function (event) { //anem a inital panel per si volem registrar mes gent etc...
    event.preventDefault();

    welcomePanel.hide();
    initialPanel.show();
});