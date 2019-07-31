/*--------------------------------------ABUELO-------------------------------------*/




 /**
 * Component  abstraction.
 * 
 * @param {HTMLElement} container 
 */

//constructor mes gran de tots els O.C. que tindrem hederant la rama de sota de aqui
function Component(container) {  
    //apliquem un condicionant que si el container que usem no es un HTMLElement, que ve a ser 
    //per lo de que va enllaçat a panels de html que ens dongi error 
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');/*para ver si en algun momento un heredero
    de component no esta asociado a un HTMLElement que nos lanze error */
    this.container = container;
}




 /*--------------------------------------PADRE-------------------------------------*/




 /**
 * Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 //es el pare, fill de component
function Panel(container) {
    Component.call(this, container); //cridem el pare per heredar els components
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

//li declarem dos funcions que son show/enseñar panel i hide/amagar panel
Panel.prototype.show = function () {
    this.container.classList.remove('panel--hide');
    this.container.classList.add('panel--show');
};

Panel.prototype.hide = function () {
    this.container.classList.remove('panel--show');
    this.container.classList.add('panel--hide');
};




  /*--------------------------------------HIJOS en plural-------------------------------------*/
//declaramos todos los nietos aqui que heredan del padre e abuelo
//aqui ja tenim tots els panels individuals de cada panel del html amb el seu nom particular
//cada un hereda la funcio de mostrar i treure de el pare





//INITIAL PANEL//////////////////////////////////////////
/**
 * Register Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function InitialPanel(container) {
    Panel.call(this, container);
}

InitialPanel.prototype = Object.create(Panel.prototype);
InitialPanel.prototype.constructor = InitialPanel;

InitialPanel.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0];

    registerLink.addEventListener('click', expression);
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[1];

    loginLink.addEventListener('click', expression);
};





//REGISTER PANEL//////////////////////////////////////////
/**
 * Register Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function RegisterPanel(container) {
    Panel.call(this, container);
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

RegisterPanel.prototype.onNavigateBack = function (expression) {
    var registerBackLink = this.container.children[2];

    registerBackLink.addEventListener('click', expression);
};

RegisterPanel.prototype.onRegisterSubmit = function (expression) {
    var registerForm = this.container.children[0];

    registerForm.addEventListener('submit', expression);
};





//REGISTER SUCCES PANEL//////////////////////////////////////////
/**
 * Register Success Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function RegisterSuccessPanel(container) {
    Panel.call(this, container);
}

RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
RegisterSuccessPanel.prototype.constructor = RegisterSuccessPanel;

RegisterSuccessPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0];

    loginLink.addEventListener('click', expression);
};





//LOGIN PANEL//////////////////////////////////////////
/**
 * Login Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function LoginPanel(container) {
    Panel.call(this, container);
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

LoginPanel.prototype.onNavigateBack = function (expression) {
    var loginBackLink = this.container.children[2];

    loginBackLink.addEventListener('click', expression);
};


LoginPanel.prototype.onLoginSubmit = function (expression) {
    var loginForm = this.container.children[0];

    loginForm.addEventListener('submit', expression);
};




//WELCOME PANEL//////////////////////////////////////////
/**
 * Welcome Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function WelcomePanel(container) {
    Panel.call(this, container);
}

WelcomePanel.prototype = Object.create(Panel.prototype);
WelcomePanel.prototype.constructor = WelcomePanel;

WelcomePanel.prototype.onNavigateBack = function (expression) {
    var registerBackLink = this.container.children[1];

    registerBackLink.addEventListener('click', expression);
};




// TODO RegisterSuccesPanel OK!, LoginPanel, WelcomePanel... (FeedbackPanel?)

