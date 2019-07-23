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

    registerLink.addEventListener('click', expression);
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[1];

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
    var registerBackLink = this.container.children[2];

    registerBackLink.addEventListener('click', expression);
};

RegisterPanel.prototype.onRegisterSubmit = function (expression) {
    var registerForm = this.container.children[0];

    registerForm.addEventListener('submit', expression);
};

// TODO RegisterSuccesPanel, LoginPanel, WelcomePanel... (FeedbackPanel?)