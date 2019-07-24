/**
 * 
 * @param {HTMLElement} container 
 */
function Component(container){

    if(!(container instanceof HTMLElement)) throw new TypeError (container + ' is not an HTMLElement');

    this.container = container;

}


/**
 * 
 * @param {HTMLElementr} container 
 */
function Panel(container){
    Component.call(this, container);
}

Panel.prototype = Object.create(Component.prototype);
Panel. prototype.constructor = Panel;


Panel.prototype.show = function () {
    this.container.classList.remove('panel--hide');
    this.container.classList.add('panel--show');
    
}

Panel.prototype.hide = function(){
    this.container.classList.remove('panel--show');
    this.container.classList.add('panel--hide');
}


/**
 * 
 * @param {HTMLElement} container 
 */
function InitialPanel(container){
    Panel.call(this,container);
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


/**
 * 
 * @param {HTMLElement} container 
 */
function RegisterPanel(container){

    Panel.call(this, container);
}

RegisterPanel.prototype= Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;


RegisterPanel.prototype.onNavigateBack = function (expression){
    var registerBackLink = this.container.children[1];

    registerBackLink.addEventListener('click',expression);
};

RegisterPanel.prototype.onSubmitRegister = function (expression) {
    var registerForm = this.container.children[0];

    registerForm.addEventListener('submit', expression);
};


// TODO RegisterSuccesPanel, LoginPanel, WelcomePanel... (FeedbackPanel?)


/**
 * 
 * @param {HTMLElement} container 
 */
function RegisterSuccessPanel(container){
    Panel.call(this, container);
}

RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
RegisterSuccessPanel.prototype.constructor= RegisterSuccessPanel;

RegisterSuccessPanel.prototype.onNavigateToLogin = function (expression){
    var loginLink = this.container.children[0];
    loginLink.addEventListener('click', expression);
}



/**
 * 
 * @param {HTMLElement} container 
 */
function LoginPanel(container){
    Panel.call(this, container);
}


LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;


LoginPanel.prototype.onNavigateBack = function (expression){
    var loginBackLink = this.container.children[1];

    loginBackLink.addEventListener('click', expression);
};

LoginPanel.prototype.onSubmitLogin = function(expression){

    var loginSuccessLink = this.container.children[0];
    loginSuccessLink.addEventListener('submit', expression);
};


/**
 * 
 * @param {HTMLElement} container 
 */
function WelcomePanel(container){
    Panel.call(this, container);
};

WelcomePanel.prototype= Object.create(Panel.prototype);
WelcomePanel.prototype.constructor= WelcomePanel;


WelcomePanel.prototype.onClickLogout = function(expression){
    var logoutButton = this.container.children[1];

    logoutButton.addEventListener('click', expression);
};



/**
 * 
 * @param {HTMLElement} container 
 */
function FeedbackPanel(container){
    Panel.call(this, container);
}


FeedbackPanel.prototype = Object.create (Panel.prototype);
FeedbackPanel.prototype.constructor = FeedbackPanel;


FeedbackPanel.prototype.showError = function(error){
    this.container.innerText = error;
};



