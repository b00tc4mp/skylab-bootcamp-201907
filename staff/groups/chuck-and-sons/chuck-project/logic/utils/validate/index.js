/**
 * Sets validation rules for required methods
 */

const validate = (() => {

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    return {
        str(target, name, empty = true, values) {
            if (typeof target !== 'string') throw new TypeError(`${name} with value ${target} is not a valid string`)

            if (empty && !target.trim()) throw new TypeError(`${name} is empty or blank`)

            if (values && !values.includes(target)) throw new TypeError(`${name} with value ${target} does not match one of the following values: ${values.join(', ')}`)
        },

        email(target, name) {
            if (!EMAIL_REGEX.test(target)) throw TypeError(`${name} with value ${target} is not a valid email`)
        },

        url(target, name) {
            if (!URL_REGEX.test(target)) throw TypeError(`${name} with value ${target} is not a valid URL`)
        },

        fn(target, name) {
            if (typeof target !== "function") throw TypeError(`${name} with value ${target} is not a valid function`)
        }
    }
})()