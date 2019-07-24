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
    var registerLink = this.container.children[0];

    registerLink.addEventListener('click', function(event){
        event.preventDefault();

        expression();
    });
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[1];

    loginLink.addEventListener('click', function(event){
        event.preventDefaul();

        expression();
    });
};
/**
 * Submit Back Panel abstranction.
 * 
 * @param {HTMLElement} container 
 */
function SubmitBackPanel(container){
    Panel.call(this, container);

    var feedbackPanel = new FeedbackPanel(this.container.children[1]);
    feedbackPanel.hide();
    this.feedback = feedbackPanel;
}

SubmitBackPanel.prototype = Object.create(Panel.prototype);
SubmitBackPanel.prototype.contructor = SubmitBackPanel;

SubmitPackPanel.prototype.onNavigateBack = function(expression){
    var backLink = this.container.children[2];

    backLink.addEventListener('click', function(event){
        event.preventDefaul();

        expression();
    });
};

SubmitBackPanel.prototype.showFeedback = function(message){
    this.feedback.setMessage(message);
    this.feedback.show();
};
//a modificacion of .show() for this case
SubmitBackPanel.prototype.show = function(){
    this.feedback.hide();

    Panel.prototype.show.call(this);
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


RegisterPanel.prototype.onSubmitRegister = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function(event){
        event.preventDefaul();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;
        var status = 0;
    });
};


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
    loginLink.addEventListener('click', function(event){
        event.preventDefaul();

        expression();
    });
};

/**
 * Login Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function LoginPanel(container) {
    SubmitBackPanel.call(this, container);
}
/////////continue
LoginPanel.prototype = Object.create(SubmitBackPanel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

LoginPanel.prototype.onNavigateBack = function (expression) {
    var loginBackLink = this.container.children[2];

    loginBackLink.addEventListener('click', expression);
};

LoginPanel.prototype.onLoginSubmit = function (expression) {
    var loginForm = this.container.children[0];

    loginForm.addEventListener('submit', expression);
};

// TODO  LoginPanel, WelcomePanel... (FeedbackPanel?)


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


WelcomePanel.prototype.onNavigateToExit = function (expression) { 
    
    var exitLink = this.container.children[1];
    exitLink.addEventListener('click', expression);
};

