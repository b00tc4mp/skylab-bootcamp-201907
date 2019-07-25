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

Panel.prototype.resetInputs = function(){
    var inputs = this.container.getElementsByTagName("input");
    for(var i = 0 ; i<inputs.length ; i++){
        inputs[i].value='';
    };
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

    registerLink.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0].children[1];

    loginLink.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
};

/**
 * Submit Back Panel abstraction.
 * 
 * @param {HTMLElement}
 */

 function SubmitBackPanel(container){
    Panel.call(this,container);

    var feedBackPanel = new FeedbackPanel(this.container.children[2]); //composite pattern
    feedBackPanel.hide();
    this.feedback = feedBackPanel;
 }

SubmitBackPanel.prototype = Object.create(Panel.prototype);
SubmitBackPanel.prototype.constructor = SubmitBackPanel;

SubmitBackPanel.prototype.onNavigateBack = function(expression){
    var backLink = this.container.children[3];

    backLink.addEventListener('click', function(event){
        event.preventDefault();
        // this.container.resetInputs();
        expression();
    });
};

SubmitBackPanel.prototype.showFeedback = function(message){
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBackPanel.prototype.show = function(){
    this.feedback.hide();
    Panel.prototype.show.call(this); //extends parent method by calling it
};
 
 
 /**
 * Register Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function RegisterPanel(container) {
    SubmitBackPanel.call(this, container);
}

RegisterPanel.prototype = Object.create(SubmitBackPanel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

RegisterPanel.prototype.onRegisterSubmit = function (expression) {
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
 * Register Success Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function RegisterSuccessPanel (container){
     Panel.call(this, container);
 }

 RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
 RegisterSuccessPanel.prototype.constructor = RegisterSuccessPanel;

 RegisterSuccessPanel.prototype.onNavigateToInit = function(expression){
    var toInitLink = this.container.children[2].children[0];
    toInitLink.addEventListener("click" , function(event){
        event.preventDefault();
        expression();
    });
 }
 
 RegisterSuccessPanel.prototype.onNavigateToLogin = function(expression){
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

 function FeedbackPanel (container){
     Panel.call(this,container);
 }

 FeedbackPanel.prototype = Object.create(Panel.prototype);
 FeedbackPanel.prototype.constructor = FeedbackPanel;

 FeedbackPanel.prototype.setMessage = function(message){
     this.container.innerText = message;
 };


 /**
 * Login Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function LoginPanel(container){
     SubmitBackPanel.call(this,container);
 }

 LoginPanel.prototype = Object.create(SubmitBackPanel.prototype);
 LoginPanel.prototype.constructor = LoginPanel;

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

HomePanel.prototype.onClickLogout = function(expression){
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
function SearchPanel(container){
    Panel.call(this,container);
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

SearchPanel.prototype.onSearchSubmit = function(expression){
    var toSearch = this.container;

    toSearch.addEventListener('submit',function(event){
        event.preventDefault();
        var galleryDiv = panels[5].getElementsByTagName('div')
    
        var query = event.target.query.value;
        expression(query);
    })
};


/**
 * Gallery Search Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function GalleryPanel(container){
    Panel.call(this,container);
 }

GalleryPanel.prototype = Object.create(Panel.prototype);
GalleryPanel.prototype.constructor = GalleryPanel;

GalleryPanel.prototype.showItems = function(items){
    var container = document.getElementsByClassName('gallery')[0];

    container.innerHTML = "";
    
    var divGallery = document.createElement('div');

    divGallery.className = "gallery__img";

    container.appendChild(divGallery);

    items.forEach(function(item) {
        var container = document.getElementsByClassName('gallery')[0];
        container.innerHTML = "";
        var divImg = document.createElement('div');
        divGallery.appendChild(divImg)
        var h3 = document.createElement('h3');
        h3.innerText = item.title;
        divImg.appendChild(h3);
        var img = document.createElement('img');
        img.src = item.imageUrl;
        divImg.appendChild(img);
    });
};