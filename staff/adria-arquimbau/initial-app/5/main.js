'use strict';

/**
 * Presentation // part visual de la web app on hi lleném el funcionament de logic i data (busines i data)
 */

 //variable per reconeixer els panels, tots els panels tenen el mateix
var panels = document.getElementsByClassName('panel');









/*------------------------------ INITIAL PANEL 0-----------------------------------------*/
// initial panel
//creem una variable objecte constructor enllaçat al panels index 0, que es la posicio en html
var initialPanel = new InitialPanel(panels[0])
//nova funcio daquest object c. que es navegar a Register Panel
initialPanel.onNavigateToRegister(function () {
    initialPanel.hide();
    registerPanel.show();
});
//nova funcio daquest object c. que es navegar a Login Panel
initialPanel.onNavigateToLogin(function () {
    initialPanel.hide();
    loginPanel.show();
});
//bastant facil, tenim les funcions que ens fan navegar a un panel o altre
//estan declarades a components, i dins cada funcio tenim tot a components







/*--------------------------- REGISTER PANEL 1-------------------------------*/
// register panel
//creem una variable objecte constructor enllaçat al panels index 1, que es la posicio en html
var registerPanel = new RegisterPanel(panels[1]);

//funcio daquest objecte que es anar enrera
registerPanel.onNavigateBack(function () {
    registerPanel.hide();//quin apaguem
    initialPanel.show();//quin encenem
});

//funcio per registrarte
//amb parametres del form on esta que declararem a components
registerPanel.onSubmitRegister(function (name, surname, email, password) {
    try {
        //iniciem funcio de registre de logic.js
        //comproba fallos de caracters
        register(name, surname, email, password);

        //si no dona error apaga panel i mostra el seguent
        registerPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {
        //funcio creada per la accio de capturar error i llençarlo
        //en cas de error ,capturen el typeError i el imprimim al children seguent
        registerPanel.showFeedback(error.message);
    }
});








/*-------------------------------------REGISTER SUCCES PANEL 2-----------------*/
// register success panel
var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

//funcio per anar a login un cop registrat
registerSuccessPanel.onNavigateToLogin(function () {
    registerSuccessPanel.hide();
    loginPanel.show();
});







/*------------------------------------LOGIN PANEL 3-----------------------*/
// login panel
//objete c. amb index 3 de panels
var loginPanel = new LoginPanel(panels[3]);

//funcio easy de anar enrera
loginPanel.onNavigateBack(function () {
    loginPanel.hide();
    initialPanel.show();
});

//funcio de logear i anar a welcome
//on fem com a register que tyenim com a aprametres de funcio 
//el que volem comprobar despres a components
loginPanel.onSubmitLogin(function (email, password) {
    try {
        //iniciem funcio login
        login(email, password);

        //en OK de login apagem panel iniciem welcome
        loginPanel.hide();
        welcomePanel.show();
    } catch(error) {

        //en cas de error iniciem funcio de
        //capturar i imprimir
        loginPanel.showFeedback(error.message);
    }
});








/*------------------------------------PANEL WELCOME 4-----------------*/
// welcome panel
var welcomePanel = new WelcomePanel(panels[4]);
//funcio easy de anar enrera
// welcomePanel.onClickLogout(function() {
//     welcomePanel.hide();
//     initialPanel.show();
// });

welcomePanel.onSearch(function (query) {
    try {
        searchRequest(query);

    } catch(error) {

        loginPanel.showFeedback(error.message);
    }

});











/*------------------------------------PANEL SEARCH 5-----------------*/
// search panel
// var searchPanel = new SearchPanel(panels[5]);


// searchPanel.onNavigateBack(function() {
//     searchPanel.hide();
//     welcomePanel.show();
// });

// searchPanel.onSearch(function () {

// });