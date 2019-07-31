'use strict';

/**
 * DIY Array, i.e. Currate ese Array!.
 * 
 * @version 1.1.0
 */
class Curray {
    constructor() {
        this.length = 0;

        if (arguments.length === 1) {
            this.length = arguments[0];
        } else if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this[i] = arguments[i];
                // this.push(arguments[i]); // TRY not to depend on push here.
            }
            this.length = arguments.length;
        }
    }

    push(element) {
        this[this.length++] = element;

        return this.length;
    };

    pop() {
        const last = this[--this.length];

        delete this[this.length];

        return last;
    };

    forEach(expression) {
        if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

        if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

        for (let i = 0; i < this.length; i++)
            expression(this[i], i, this);
    };

    find(expression) {
        if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

        if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

        for (let i = 0; i < this.length; i++) {
            const element = this[i];
            if (expression(this[i], i, this)) return element;
        }
    }
}
