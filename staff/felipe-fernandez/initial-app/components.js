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
 * @param {HTMLElement} container 
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
 * Initial panel abstraction
 * @param {HTMLElement} container 
 */
function InitialPanel(container){
    Panel.call(this,container);
}


InitialPanel.prototype = Object.create(Panel.prototype);
InitialPanel.prototype.constructor = InitialPanel;

InitialPanel.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0];

    registerLink.addEventListener('click',  function(event){
        event.preventDefault();
        expression();
    });
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[1];

    loginLink.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
};


/**
 * Submit Back panel
 * Parent of Register and Login panels
 * Child of Panel panel
 * 
 * @param {HTMLElement} container 
 */
function SubmitBackPanel(container){
    Panel.call(this, container);

    var feedbackPanel = new FeedbackPanel(this.container.children[1]);
    feedbackPanel.hide();
    this.feedback = feedbackPanel;
}

SubmitBackPanel.prototype = Object.create (Panel.prototype);
SubmitBackPanel.prototype.constructor = SubmitBackPanel;

SubmitBackPanel.prototype.onNavigateBack = function(expression){
    var registerBackLink = this.container.children[2];

    registerBackLink.addEventListener('click',function(event){
        event.preventDefault();
        expression();

    });
};

SubmitBackPanel.prototype.showFeedback = function(message){
    this.feedback.showError(message);
    this.feedback.show();
}

SubmitBackPanel.prototype.show = function(){
    this.feedback.hide();

    Panel.prototype.show.call(this);
}



/**
 * Register panel abstraction
 * @param {HTMLElement} container 
 */
function RegisterPanel(container){

    Panel.call(this, container);

    var feedbackPanel = new FeedbackPanel(this.container.children[1]);
    feedbackPanel.hide();
    this.feedback = feedbackPanel;
}

RegisterPanel.prototype= Object.create(SubmitBackPanel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;


/* RegisterPanel.prototype.onNavigateBack = function (expression){
    var registerBackLink = this.container.children[2];

    registerBackLink.addEventListener('click',function(event){
        event.preventDefault();
        expression();

    });
}; */

RegisterPanel.prototype.onSubmitRegister = function (expression) {
    var registerForm = this.container.children[0];
 
    registerForm.addEventListener('submit', function(event){
        event.preventDefault();
        
        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    }); 

};

/* RegisterPanel.prototype.showFeedback = function(message){
    this.feedback.showError(message);
    this.feedback.show();
};

RegisterPanel.prototype.show= function(){
    this.feedback.hide();
    Panel.prototype.show.call(this);
} */


// TODO RegisterSuccesPanel, LoginPanel, WelcomePanel... (FeedbackPanel?)


/**
 * Register success panel
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
 * Login panel abstraction
 * @param {HTMLElement} container 
 */
function LoginPanel(container){
    Panel.call(this, container);

    var feedbackPanel = new FeedbackPanel(this.container.children[1]);
    feedbackPanel.hide();
    this.feedback = feedbackPanel;
}


LoginPanel.prototype = Object.create(SubmitBackPanel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

/* 
LoginPanel.prototype.onNavigateBack = function (expression){
    var loginBackLink = this.container.children[2];

    loginBackLink.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
}; */

LoginPanel.prototype.onSubmitLogin = function(expression){

    var loginForm = this.container.children[0];
    loginForm.addEventListener('submit', function(event){
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);

    });
};
/* 
LoginPanel.prototype.showFeedback = function(message){
    this.feedback.showError(message);
    this.feedback.show();
};

LoginPanel.prototype.show = function(){
    this.feedback.hide();
    Panel.prototype.show.call(this);
} */


/**
 * Welcome panel
 * @param {HTMLElement} container 
 */
function WelcomePanel(container){
    Panel.call(this, container);
};

WelcomePanel.prototype= Object.create(Panel.prototype);
WelcomePanel.prototype.constructor= WelcomePanel;


WelcomePanel.prototype.onClickLogout = function(expression){
    var logoutButton = this.container.children[1];

    logoutButton.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
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



