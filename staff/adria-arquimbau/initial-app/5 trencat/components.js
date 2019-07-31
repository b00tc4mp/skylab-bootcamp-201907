
/*--------------------------------------ABUELO-------------------------------------*/

/**
 * Component abstraction.
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
 //es el pare, osigui, fill de component

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
//TENIM dividit en els panels normals i un altrre model que es SUBMIT
//on SUBMIT englobara el panel de login i register per heredar la funcionalitat de fer submit amb les dades/aqui ja tenim tots els panels individuals de cada panel del html amb el seu nom particular
//cada un hereda la funcio de mostrar i treure de el pare

//INITIAL PANEL//////////////////////////////////////////
/**
 * Initial Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function InitialPanel(container) {
    Panel.call(this, container); //crida el pare Panel per heredar 
}

InitialPanel.prototype = Object.create(Panel.prototype); //creem objecte constructor de Panel
InitialPanel.prototype.constructor = InitialPanel; 

// expressem de la funcio onNavi... on esta posicio del boto, el event.predefault que ens diu que no
//recargui
//la expression dins de funcio es refereix a les funcions internas de main que fan el hide i show
//si treiessim expression de aki i fikessim el de main funcionaria igual snse lo de dins de la funcio a main
InitialPanel.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0];

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

//igual que anterior pero amb anar a toLogin
InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[1];

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};








//REGISTER SUCCES PANEL//////////////////////////////////////////
/**
 * Register Success Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
//fill de panel
function RegisterSuccessPanel(container) {
    Panel.call(this, container);
}

RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
RegisterSuccessPanel.prototype.constructor = RegisterSuccessPanel;

//unica funcio de anar a login, com abans pero en modo de un sol cami
RegisterSuccessPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0];

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
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

//mateix que anteriors pero amb un unic cami de logout
WelcomePanel.prototype = Object.create(Panel.prototype);
WelcomePanel.prototype.constructor = WelcomePanel;

WelcomeBackPanel.prototype.logOut = function (expression) {
    var logOut = this.container.children[2];

    logOut.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

WelcomePanel.prototype.onSearch = function (expression) {
    var form = this.container.children[1];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var search = event.target.ducks.value;
        expression(search);
    });
}











//FEEDBACK PANEL//////////////////////////////////////////
/**
 * Feedback Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
//panel per definir els missatges de error en quan fem malament dades de register i login
function FeedbackPanel(container) {
    Panel.call(this, container);
}

FeedbackPanel.prototype = Object.create(Panel.prototype);
FeedbackPanel.prototype.constructor = FeedbackPanel;

FeedbackPanel.prototype.setMessage = function(message) {
    this.container.innerText = message;
};










//SUBMIT BACK PANEL//////////////////////////////////////////
/**
 * Submit Back Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

//CREEM UN FILL QUE NOMES TINDRA ALGO EN COMU PER FICAR A DINS SEU A LOGIN I REGISTER PER HEREDAR COSES QUE ELS ALTRES NO NECESSITEN
function SubmitBackPanel(container) {
    Panel.call(this, container);

    var feedbackPanel = new FeedbackPanel(this.container.children[1]);
    feedbackPanel.hide();
    this.feedback = feedbackPanel;
}

SubmitBackPanel.prototype = Object.create(Panel.prototype);
SubmitBackPanel.prototype.constructor = SubmitBackPanel;

SubmitBackPanel.prototype.onNavigateBack = function (expression) {
    var backLink = this.container.children[2];

    backLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

SubmitBackPanel.prototype.showFeedback = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBackPanel.prototype.show = function() {
    this.feedback.hide();

    //this.show(); // ERROR infinite recursion loop
    Panel.prototype.show.call(this);
};









 /*--------------------------------------NIETOS en plural-------------------------------------*/



 //REGISTER PANEL//////////////////////////////////////////

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

RegisterPanel.prototype.onSubmitRegister = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    });
};









//LOGIN PANEL//////////////////////////////////////////

/**
 * Login Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function LoginPanel(container) {
    SubmitBackPanel.call(this, container);
}

LoginPanel.prototype = Object.create(SubmitBackPanel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

LoginPanel.prototype.onSubmitLogin = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = event.target.email.value;   
        var password = event.target.password.value;

        expression(email, password);
    });
};