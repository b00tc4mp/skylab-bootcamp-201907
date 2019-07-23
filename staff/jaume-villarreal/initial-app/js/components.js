/**
 * Component abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');

    this.container = container;
}

/**
 * Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Panel(container) {
    Component.call(this, container);
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.show = function () {
    this.container.classList.remove('panel--hide');
    this.container.classList.add('panel--show');
};

Panel.prototype.hide = function () {
    this.container.classList.remove('panel--show');
    this.container.classList.add('panel--hide');
};

/**
 * Initial Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function InitialPanel(container) {
    Panel.call(this, container);
}

InitialPanel.prototype = Object.create(Panel.prototype);
InitialPanel.prototype.constructor = InitialPanel;

InitialPanel.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0].children[0];

    registerLink.addEventListener('click', expression);
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0].children[1];

    loginLink.addEventListener('click', expression);
};

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
    var registerBackLink = this.container.children[3];

    registerBackLink.addEventListener('click', expression);
};

RegisterPanel.prototype.onRegisterSubmit = function (expression) {
    var registerForm = this.container.children[1];
    // var submitButtonForm = registerForm.children[8].children[0];

    registerForm.addEventListener('submit', expression);
};

/**
 * Register Success Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function RegisterSuccessPanel (container){
     Panel.call(this, container);
 }

 RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
 RegisterSuccessPanel.prototype.constructor = RegisterSuccessPanel;

 RegisterSuccessPanel.prototype.onSuccessRegister = function(expression){
    var registerSuccessLink = this.container.children[1].children[0];
    registerSuccessLink.addEventListener("click" , expression);
 }

 /**
 * Feedback Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function FeedbackPanel (container){
     Panel.call(this,container);
 }

 FeedbackPanel.prototype = Object.create(Panel.prototype);
 FeedbackPanel.prototype.constructor = FeedbackPanel;

 FeedbackPanel.prototype.showErrors = function(stringErrors){
     this.container.innerText = stringErrors;
 };


 /**
 * Login Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function LoginPanel(container){
     Panel.call(this,container);
 }

 LoginPanel.prototype = Object.create(Panel.prototype);
 LoginPanel.prototype.constructor = LoginPanel;

 LoginPanel.prototype.onNavigateInit = function(expression){
     var backLoginLink = this.container.children[3];
     backLoginLink.addEventListener('click' , expression);
 }

 LoginPanel.prototype.onSuccessLogin = function(expression){
     var loginForm = this.container.children[1];
     loginForm.addEventListener('submit' , expression);
 }


  /**
 * Home Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function HomePanel(container){
    Panel.call(this,container);
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

HomePanel.prototype.onLogout = function(expression){
    backLogoutLink = this.container.children[1];
    backLogoutLink.addEventListener('click' , expression);
}
 


