function translateError(message , email){
    let errorMessage = ""
    switch(message){
        case 'name is empty or blank':
            // errorMessage = "El nom està buit"
            errorMessage = "El campo nombre está vacío"
            break;
        case 'surname is empty or blank':
            // errorMessage = "Els cognoms estan buits"
            errorMessage = "El campo apellido está vacío"
            break;
        case ' is empty or blank':
            errorMessage = "El DNI està buit"
            // errorMessage = ""
            break;
        case 'phone1 is empty or blank':
            errorMessage = "El telèfon està buit"
            // errorMessage = ""
            break;
        case 'email is empty or blank':
            // errorMessage = "El correu electrònic està buit"
            errorMessage = "El correo eleectronico esta vacio"
            break;
        case `user with email ${email} does not exist`:
            errorMessage = `Email o contraseña son erroneos`
            // errorMessage = ""
            break;
        case `user with e-mail ${email} already exists`:
            errorMessage = `El usuario ${email} esta registrado `
                // errorMessage = ""
            break;
        case `wrong credentials`:
            errorMessage = `Error en las credenciales`
                    // errorMessage = ""
            break;
        case 'password is empty or blank':
            // errorMessage = "La contrasenya està buida"
            errorMessage = "La contraseña esta vacia"
            break;
        // case 'repassword is empty or blank':
        //     errorMessage = "La contrasenya de confirmació està buida"
        //     // errorMessage = ""
        //     break;
        case 'title is empty or blank':
            // errorMessage = "El nom està buit"
            errorMessage = "El título esta vacio"
            break;
        case 'body is empty or blank':
            // errorMessage = "Els cognoms estan buits"
            errorMessage = "El cuerpo del email esta vacio está vacío"
            break;
        
        case 'description is empty or blank':
            // errorMessage = "El nom està buit"
            errorMessage = "La descripción esta vacia"
            break;
        case 'price is empty or blank':
            // errorMessage = "Els cognoms estan buits"
            errorMessage = "El precio esta vacio está vacío"
            break;
        case 'location is empty or blank':
                // errorMessage = "Els cognoms estan buits"
            errorMessage = "La localización está vacía"
            break;
        
        }
    return errorMessage
}

export default translateError