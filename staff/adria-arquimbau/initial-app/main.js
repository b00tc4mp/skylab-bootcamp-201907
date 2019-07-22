//declarem array buida de users per acabar ficant user mes endevant
var users = [];
//mateix per checkejar aprametres del login
var usersCheck = [];

//variable per reconeixer els panels, tots els panels tenen el mateix
var panels = document.getElementsByClassName('panel');

/*------------------------------PANEL INITIAL 0----------------------------------------------------------------------------*/
// initial panel
var initialPanel = panels[0]; //es refereix a tot el panel en general, provar sempre a ficar a consola per veure-ho
var registerLink = initialPanel.children[0]; //dins de initialPanel variable es refereix al primer indice que es register
var loginLink = initialPanel.children[1]; //dins de initialPanel variable es refereix al segon indice que es register

registerLink.addEventListener('click', function (event) { //quan fem click a registerLink canvia les clases per veure o treure
    event.preventDefault(); //quan fem un submit la pagina es refresca, aixo fa que no pasi

    initialPanel.classList.remove('panel--show'); //treiem el show de la seccio initial panel i li fiquem la class list de hide i aixi no es veu
    initialPanel.classList.add('panel--hide'); //al css tenim marcat que show es veu i hide no es veu

    registerPanel.classList.remove('panel--hide'); //treiem hide del register panel i li fiquem el show per veurel
    registerPanel.classList.add('panel--show');
});

/*-----------------------PANEL LOGIN 3 //ES EL 3 QUE ESTA DECLARAT ABAIX QUE ES REUTILITZA---------------------------------*/

loginLink.addEventListener('click', function (event) { //el mateix que abans pero amb el Login i ens porta a loginPanel en ves de Register
    event.preventDefault(); //quan fem un submit la pagina es refresca, aixo fa que no pasi

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

/*---------------------------PANEL REGISTRO 1-------------------------------------------------------------------------------*/

var registerPanel = panels[1]; //de tots els panels es el segon 'index 1' que es el del formulari de registre
var registerBackLink = registerPanel.children[1]; // es el back de register panel

registerBackLink.addEventListener('click', function (event) { //el boto back de register 
    event.preventDefault(); //quan fem un submit la pagina es refresca, aixo fa que no pasi

    registerPanel.classList.remove('panel--show'); // el register panel el pasa de show a hide
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide'); //el initial panel el pasa de hide a show
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0]; //accedim al form de registerpanel
registerForm.addEventListener('submit', function (event) {
    event.preventDefault(); //quan fem un submit la pagina es refresca, aixo fa que no pasi
    //ja em dit que tot lo de aqui dins es del form panel de registerpanel
    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    if (users) {
            //que fa aixo aqui???
    }
    users.push({ //users esta declarat al principi, aki pusheem el objecte de tots els parametres ala rray users
        name: name,
        surname: surname,
        email: email,
        password: password
    });

    registerPanel.classList.remove('panel--show'); //pasem el registerpanel de veures a no
    registerPanel.classList.add('panel--hide');
    //activem el register succes panel ke dona OK al registre i dona opcio a fer LOGIN directe
    registerSuccessPanel.classList.remove('panel--hide');
    registerSuccessPanel.classList.add('panel--show');
});

/*-------------------------------------PANEL REG. SUCCES 2---------------------------------------------------------------------*/
var registerSuccessPanel = panels[2];
var loginLinkTwo = registerSuccessPanel.children[0];

loginLinkTwo.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});


/*------------------------------------PANEL LOGIN 3----------------------------------------------------------------------*/
var loginPanel = panels[3]; //definim quin es el login panel
var loginForm = loginPanel.children[0]; //definim quin el boto back de Login per anar welcome

loginForm.addEventListener('submit', function (event) { // i amb el puto boto de children 0 que es el Login anem a welcome
    event.preventDefault(); //quan fem un submit la pagina es refresca, aixo fa que no pasi

    email = event.target.email.value;
    password = event.target.password.value;

    usersCheck.push({ //users check esta declarat al principi, aki pusheem el objecte de tots els parametres ala array usersCheck

        email: email,
        password: password
    });

    //mirar com fe per coincidencia i anar a welcome

    for (var i = 0; i < users.length; i++) { //for per recorrer el users
        if (users[i].email === usersCheck[0].email && users[i].password === usersCheck[0].password) {
            loginPanel.classList.remove('panel--show'); //pasem el login Panel a no veures
            loginPanel.classList.add('panel--hide');
            //activem el welcomePanel
            welcomePanel.classList.remove('panel--hide');
            welcomePanel.classList.add('panel--show');
        } else {
            confirm("Wrong Password!"); //quan salta no torna a llegir be si u fiques correcte despres
              
        }

    }


});

/*------------------------------------PANEL WELCOME 4----------------------------------------------------------------------*/
var welcomePanel = panels[4];
var welcomeForm = welcomePanel.children[0]; //definim quin el boto back de Login per anar welcome

welcomeForm.addEventListener('click', function (event) { // i amb el puto boto de children 0 anem a Inicio
    event.preventDefault(); //quan fem un submit la pagina es refresca, aixo fa que no pasi

    welcomePanel.classList.remove('panel--show');
    welcomePanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});