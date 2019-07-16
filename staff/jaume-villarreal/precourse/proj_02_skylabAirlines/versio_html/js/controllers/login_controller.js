$(document).ready(function(){
        // mètode de validació
        //és invocat des de 'view.js'
        //retorna un booleà que permet o no renderitzar la interfície amb les dades d'usuari i de vols
        var validateForm = function (name , users){
            var flag = false;
            i = 0;
            while(flag==false && i<users.length){
                if(name == users[i].name){
                    flag = true;
                };
                i++;
            }
            return flag;
        };

        //mètode de confirmació d'error
        //és invocat des de 'view.js'
        //renderitza un 'alert' si la validació del formulari ha retornat 'false'
        var loginError = function(name){
            alert(`The user ${name} is not registered in our database.`);
            $('#userName').val('');
        }

        $('#submitButton').click(function(){
            //validació de les dades de formulari
            //..atès que encara no es treballa amb tecnologia de servidor
            //..la validació de les dades es fa amb un pseudoformulari
            var userName = $('#userName').val();
            if(validateForm(userName , users)){
                var stringQuery = `?username=${userName}`;
                window.location.href = `index.html${stringQuery}`;
            }
            else{
                loginError(userName);
            }
        });
    }
);



