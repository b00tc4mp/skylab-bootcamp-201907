function translateMessage(message , email ){
    let translatedMessage = ""
    switch(message){
        case 'name is empty or blank':
            translatedMessage = "El nom està buit"
            break;
        case 'surname is empty or blank':
            translatedMessage = "Els cognoms estan buits"
            break;
        case 'dni is empty or blank':
            translatedMessage = "El DNI està buit"
            break;
        case 'phone1 is empty or blank':
            translatedMessage = "El telèfon està buit"
            break;
        case 'email is empty or blank':
            translatedMessage = "El correu electrònic està buit"
            break;
        case `email with value ${email} is not a valid e-mail`:
            translatedMessage = `El correu electrònic no té un format correcte`
            break;
        case `tutor with email ${email} already exists`:
            translatedMessage = `L'ususari amb el correu electrònic ${email} ja existeix`
            break;
        case 'password is empty or blank':
            translatedMessage = "La contrasenya està buida"
            break;
        case 'repassword is empty or blank':
            translatedMessage = "La contrasenya de confirmació està buida"
            break;
        case 'passwords don\'t match':
            translatedMessage = "Les contrasenyes no coincideixen"
            break;
        case 'wrong credentials':
            translatedMessage = "Credentials incorrectes"
            break;
        case 'name is not a valid string':
            translatedMessage = "El nom no té un format correcte"
            break;
        case 'surname is not a valid string':
            translatedMessage = "El cognom no té un format correcte"
            break;
        case 'student updated correctly':
            translatedMessage = "L'usuari ha estat actualitzat correctament"
            break;
        case 'school is empty or blank':
            translatedMessage = "L'escola de procedència no ha estat especificada."
            break;
        case 'group is empty or blank':
            translatedMessage = "El curs escolar actual no ha estat especificat."
            break;
        case 'shirt is empty or blank':
            translatedMessage = "La talla de samarreta no ha estat especificada."
            break;
        case 'activity is empty or blank':
            translatedMessage = "La modalitat de casal no ha estat especificada."
            break;
        case 'image authorization is empty or blank':
            translatedMessage = "L'autorització sobre els drets d'imatge no ha estat especificada."
            break;
        case 'excursion authorization is empty or blank':
            translatedMessage = "L'autorització sobre les sortides no ha estat especificada."
            break;
        case 'no week selected':
            translatedMessage = "La mdalittat de jornada no ha estat especificada."
            break;
        case 'this student has already registered an enrollemnt for current year':
            translatedMessage = "L'usuari ja ha registrat una inscripció pel curs actual."
            break;
        case 'this enrollment does not exist':
            translatedMessage = "L'usuari encara no ha realitzat la inscripció pel curs actual."
            break;
        case `this student already exists`:
            translatedMessage = `Aquest usuari usuari ja ha estat registrat.`
            break;
        default:
                translatedMessage = message
            break;
        }
    return translatedMessage
}

export default translateMessage