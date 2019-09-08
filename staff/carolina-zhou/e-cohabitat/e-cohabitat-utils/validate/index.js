module.exports = (() => {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ 

    return {   

            string(target, name, empty = true, values) {
                if (typeof target !== 'string') throw TypeError(`${name} with value ${target} is not a string`)
                if (empty && !target.trim()) throw new Error(`${name} is empty or blank`)
                if (values && !values.includes(target)) throw new Error(`${name} with value ${target} does not match one of the expected values: ${values.join(', ')}`)
            },

            number(target, name) {
                if (typeof target !== 'number' && target !== '') throw TypeError(`${name} with value ${target} is not a number`)
                if (target === '') throw new Error(`${name} is empty or blank`)
            },

            boolean(target, name) {
                if (typeof target !== 'boolean' && target !== '') throw TypeError(`${name} with value ${target} is not a boolean`)
                if (target === '') throw new Error(`${name} is empty or blank`)
            },

            date(target, name) {
                if (!(target instanceof Date) && target !== '') throw TypeError(`${name} with value ${target} is not a date`)
                if (target === '') throw new Error(`${name} is empty or blank`)
            },

            email(target, name) {
                if (!EMAIL_REGEX.test(target) && target !== '') throw new Error(`${name} with value ${target} is not a valid e-mail`)
                if (target === '') throw new Error(`${name} is empty or blank`)
            },

            function(target, name) {
                if (typeof target !== 'function' && target !== '') throw TypeError(`${name} with value ${target} is not a function`)
                if (target === '') throw new Error(`${name} is empty or blank`)
            },

            url(target, name) {
                if (!URL_REGEX.test(target) && target !== '') throw new Error(`${name} with value ${target} is not a valid URL`)
                if (target === '') throw new Error(`${name} is empty or blank`)
            },
            
            object(target, name) {
                if (typeof target !== 'object' && target !== '') throw new Error(`${name} with value ${target} is not an object`)
                if (target === '') throw new Error(`${name} is empty or blank`)
            }
    }
})()