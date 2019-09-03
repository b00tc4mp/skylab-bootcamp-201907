const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

module.exports = {
    string(target, name, empty = true, values) {
        if (typeof target !== 'string') return `${name} with value ${target} is not a string`
        if (empty && !target.trim()) return `${name} is empty or blank`
        if (values && !values.includes(target)) return `${name} with value ${target} does not match one of the expected values: ${values.join(', ')}`
    },

    email(target, name) {
        if (!EMAIL_REGEX.test(target)) return `${name} with value ${target} is not a valid e-mail`
    },

    function(target, name) {
        if (typeof target !== 'function') return `${name} with value ${target} is not a function`
    },

    url(target, name) {
        if (!URL_REGEX.test(target)) return `${name} with value ${target} is not a valid URL`
    },

    multiple(criteria) {

        if (criteria) {
            let errors = []
            let error
            
            criteria.forEach(obj => {
                switch (obj.type) {
                    case 'string':
                        error = this.string(obj.target, obj.name, obj.empty, obj.values)
                        break
                    case 'email':
                        error = this.email(obj.target, obj.name)
                        break
                    case 'function':
                        error = this.function(obj.target, obj.name)
                        break
                    case 'url':
                        error = this.url(obj.target, obj.name)
                        break
                }
                error && errors.push(error) 
            })
            return errors
        }

    }
}