/**
 * Component abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');

    this.container = container;
}

Component.prototype.show = function () {
    this.container.classList.remove('panel--hide');
    this.container.classList.add('panel--show');
};

Component.prototype.hide = function () {
    this.container.classList.remove('panel--show');
    this.container.classList.add('panel--hide');
};

Component.prototype.resetInputs = function(){
    var inputs = this.container.getElementsByTagName("input");
    for(var i = 0 ; i<inputs.length ; i++){
        inputs[i].value='';
    };
};


/**
 * Initial  abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Initial(container) {
    Component.call(this, container);
}

Initial.prototype = Object.create(Component.prototype);
Initial.prototype.constructor = Initial;

Initial.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0].children[0];

    registerLink.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
};

Initial.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0].children[1];

    loginLink.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
};

/**
 * Submit Back abstraction.
 * 
 * @param {HTMLElement}
 */

 function SubmitBack(container){
    Component.call(this,container);

    var feedback = new Feedback(this.container.children[2]); //composite pattern
    feedback.hide();
    this.feedback = feedback;
 }

SubmitBack.prototype = Object.create(Component.prototype);
SubmitBack.prototype.constructor = SubmitBack;

SubmitBack.prototype.onNavigateBack = function(expression){
    var backLink = this.container.children[3];

    backLink.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
};

SubmitBack.prototype.showFeedback = function(message){
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBack.prototype.show = function(){
    this.feedback.hide();
    Component.prototype.show.call(this); //extends parent method by calling it
};
 
 
 /**
 * Register abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Register(container) {
    SubmitBack.call(this, container);
}

Register.prototype = Object.create(SubmitBack.prototype);
Register.prototype.constructor = Register;

Register.prototype.onRegisterSubmit = function (expression) {
    var registerForm = this.container.children[1];
    registerForm.addEventListener('submit', function(event){
        event.preventDefault();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.mail.value;
        var password = event.target.password.value;

        expression(name , surname , email , password);
    });
};


/**
 * Register Success abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function RegisterSuccess (container){
     Component.call(this, container);
 }

 RegisterSuccess.prototype = Object.create(Component.prototype);
 RegisterSuccess.prototype.constructor = RegisterSuccess;

 RegisterSuccess.prototype.onNavigateToInit = function(expression){
    var toInitLink = this.container.children[2].children[0];
    toInitLink.addEventListener("click" , function(event){
        event.preventDefault();
        expression();
    });
 }
 
 RegisterSuccess.prototype.onNavigateToLogin = function(expression){
    var toLoginLink = this.container.children[2].children[1];
    toLoginLink.addEventListener("click" , function(event){
        event.preventDefault();
        expression();
    });
 }

 /**
 * Feedback Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function Feedback (container){
     Component.call(this,container);
 }

 Feedback.prototype = Object.create(Component.prototype);
 Feedback.prototype.constructor = Feedback;

 Feedback.prototype.setMessage = function(message){
     this.container.innerText = message;
 };


 /**
 * Login abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function Login(container){
     SubmitBack.call(this,container);
 }

 Login.prototype = Object.create(SubmitBack.prototype);
 Login.prototype.constructor = Login;

 Login.prototype.onSuccessLogin = function(expression){
     var loginForm = this.container.children[1];
     loginForm.addEventListener('submit' , expression);
 }


  /**
 * Home abstraction.
 * 
 * @param {HTMLElement} container 
 */

function Home(container){
    Component.call(this,container);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.onClickLogout = function(expression){
    backLogoutLink = this.container.children[1];

    backLogoutLink.addEventListener('click' , function(){
        event.preventDefault();
        expression();
    });
};


 /**
 * Search Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Search(container){
    Component.call(this,container);
}

Search.prototype = Object.create(Component.prototype);
Search.prototype.constructor = Search;

Search.prototype.onSearchSubmit = function(expression){
    var form = this.container;

    form.addEventListener('submit',function(event){
        event.preventDefault();

        var query = form.query.value;
        expression(query);
    })
};


/**
 * Results Search Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function Results(container){
    Component.call(this , container);
};

Results.prototype = Object.create(Component.prototype);
Results.prototype.constructor = Results;

Results.prototype.listItems = function(items){
    var ul = this.container.getElementsByClassName('gallery');
    ul.innerHTML = '';

    items.forEach(function(item){
        var li = document.createElement('li');
        ul.appendChild(li);
        this.paintItem(li,item);
    }.bind(this));
}