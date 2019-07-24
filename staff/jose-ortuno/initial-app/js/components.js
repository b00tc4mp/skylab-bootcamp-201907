'use strict';

/**
 * Component abstraction.
 * Le marcamos una condición para que nos avise si en algún momento colamos un elemnto que no sea un elemento HTML.
 * 
 * El container contiene Paneles. A su vez un container es el contenedor que forma parte de un componente.
 * 
 * @param {HTMLElement} container 
 */
function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');

    this.container = container;
}

// ---------------------------------------------------

/**
 * Con esto encadenamos constructores, Es decir, en la sihuiente función, el constructor para el objeto Component es definido con un parámetro, container. La función Panel invoca a Component pasandole this y container como argumentos. Component inicializa la propiedad container, luego una función especialista como Panel acojen la propiedad container como suya.
 * 
 * Paneles, partes fundamentales de un componente. Normalmente el panel sigue siendo parte generalista de un componente, es decir, si componente es todo aquello que tiene en común una web, panel, es todo aquello que tiene en común un componente determinado de una web.
 * 
 * ENUMERAMOS LOS PANELES QUE FORMAN PARTE DEL COMPONETE: 
 *  -INITIAL PANEL
 *  -REGISTER
 *  -REGISTERED
 *  -LOGIN
 *  -WELCOME
 * 
 * @param {HTMLElement} cintainer 
 */
function Panel (container) {
    Component.call(this, container);
}

// Hacemos que el Panel no sólo se cree, si no que herede el prototype determinado de Component. En el paso Call, lo primero era hacer como suyos, propiedades del contructor padre.
// Para terminar, necesitamos cerrar la herencia haciendo del panel el contructor que ha heredado. De esta manera, el contructor saldra en su proto y no en el heredado.
Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

// Definimos métodos que tienen en común los paneles en general.
Panel.prototype.show = function () {
    this.container.classList.remove('panel--hide');
    this.container.classList.add('panel--show');
};
Panel.prototype.hide = function () {
    this.container.classList.remove('panel--show');
    this.container.classList.add('panel--hide');
};

// ---------------------------------------------------

/**
 * INITIAL PANEL abstraction.
 * 
 * @param {HTMLElement} container 
 */
function InitialPanel(container) {
    Panel.call(this, container);
}

// HERENCIA
InitialPanel.prototype = Object.create(Panel.prototype);
InitialPanel.prototype.constructor = InitialPanel;

// NAVIGATION
InitialPanel.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[1];

    registerLink.addEventListener('click', function(event) {
        event.preventDefault();

        expression();
    });
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[2];

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();

        expression();
    });
};

// ---------------------------------------------------

function SubmitBackPanel(container) {
    Panel.call(this, container);

    // Creamos una instancia dentro de Register Panel, para mostrar el error.
    var feedbackPanel = new FeedbackPanel(this.container.children[2]);
    // Con esto conseguimos que cada vez que hagamos la llamada al register, venga implicito feedbackPanel escondido.
    feedbackPanel.hide();
    // Aquí creamos la propiedad para poder utilizar métodos del Feedback. Human --> Hombre
    this.feedback = feedbackPanel;
}

SubmitBackPanel.prototype = Object.create(Panel.prototype);
SubmitBackPanel.prototype.constructor = SubmitBackPanel;

// NAVIGATION
SubmitBackPanel.prototype.onNavigateBack = function (expression) {
    var backLink = this.container.children[3];

    backLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

// SHOW ERROR MESSAGE
SubmitBackPanel.prototype.showFeedback = function(message) {
    this.feedback.setMessage(message);
    this.feedback.show();
}

// LLAMAMOS AL SHOW PRINCIPAL PARA HEREDARLO EN FEEDBACK
SubmitBackPanel.prototype.show = function() {
    this.feedback.hide();

    //this.show(); // ERROR infinite recursion loop
    // Encadena constructores
    Panel.prototype.show.call(this);
};


// ---------------------------------------------------

/**
 * REGISTER PANEL abstraction.
 * 
 * @param {HTMLElement} container 
 */
function RegisterPanel(container) {
    SubmitBackPanel.call(this, container);

}
// HERENCIA
RegisterPanel.prototype = Object.create(SubmitBackPanel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

// FORM
RegisterPanel.prototype.onRegisterSubmit = function (expression) {
    
    var registerForm = this.container.children[1];
    // GET-->PRESENT: data user
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault()
    
        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    });
};

// ---------------------------------------------------

/**
 * REGISTER SUCCES PANEL abstraction
 * 
 * @param {HTMLElemnet} container 
 */
function RegisterSuccesPanel(container) {
    Panel.call(this, container);
}
// HERENCIA
RegisterSuccesPanel.prototype = Object.create(Panel.prototype);
RegisterSuccesPanel.prototype.constructor = RegisterSuccesPanel;

// NAVIGATION
RegisterSuccesPanel.prototype.onNavigateToLogin = function(expression) {
    var registerSuccesBack = this.container.children[1].children[0];

    registerSuccesBack.addEventListener('click', function(event) {
        event.preventDefault();

        expression();
    });
}

// ---------------------------------------------------

/**
 * LOGIN PANEL abstraction
 * 
 * @param {HTMLElemnet} container 
 */
function LoginPanel(container) {
    SubmitBackPanel.call(this, container);

}
// HERENCIA
LoginPanel.prototype = Object.create(SubmitBackPanel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

// FORM
LoginPanel.prototype.onNavigateToWelcome = function(expression) {
    var loginLink = this.container.children[1];

    loginLink.addEventListener('submit', function(event) {
        event.preventDefault()

        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);
    });
};

// ---------------------------------------------------

/**
 * WELCOME PANEL abstraction
 * 
 * @param {HTMLElemnet} container 
 */
function WelcomePanel(container) {
    Panel.call(this, container);
}

WelcomePanel.prototype = Object.create(Panel.prototype);
WelcomePanel.prototype.constructor = WelcomePanel;

WelcomePanel.prototype.onClickLogout = function(expression) {
    var logout = this.container.children[2];

    logout.addEventListener('click', function(event) {
        event.preventDefault()

        expression();
    });
};

// ---------------------------------------------------

/**
 * FEEDBACK PANEL abstraction
 * 
 * @param {HTMLElemnet} container 
 */
function FeedbackPanel(container) {
    Panel.call(this, container);
}

FeedbackPanel.prototype = Object.create(Panel.prototype);
FeedbackPanel.prototype.constructor = FeedbackPanel;

// MÉTODO QUE IMPRIME EL MENSAJE
FeedbackPanel.prototype.setMessage = function(message) {
    this.container.innerText = message;
}