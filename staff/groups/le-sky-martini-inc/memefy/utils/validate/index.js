/**
 * Register new users to Herokuapp's API via form.
 * If the user is already registered API returns a error message.
 * If the register goes well, API returns a 'KO' status and an error message.
 * 
 * @var {String} EMAIL_REGEX Email Address Regular Expression
 * @param {String} URL_REGEX URL Address Regular Expression
 * 
 * 
 * @return {String} Specified error messages.
 */


const validate = (() => { 

    
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ 

    return {
        string(target, name, empty = true, values) {
            if (typeof target !== 'string') throw TypeError(`${name} with value ${target} is not a string`)
            if (empty && !target.trim()) throw new Error(`${name} is empty or blank`)
            if (values && !values.includes(target)) throw new Error(`${name} with value ${target} does not match one of the expected values: ${values.join(', ')}`)
        },

        email(target, name) {
            if (!EMAIL_REGEX.test(target)) throw new Error(`${name} with value ${target} is not a valid e-mail`)
        },

        function(target, name) {
            if (typeof target !== 'function') throw TypeError(`${name} with value ${target} is not a function`)
        },

        url(target, name) {
            if (!URL_REGEX.test(target)) throw new Error(`${name} with value ${target} is not a valid URL`)
        }
    }
})()