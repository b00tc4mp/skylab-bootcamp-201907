'use strict';

/**
 * Feedback abstraction.
 * 
 * @param {*} container 
 */
function Feedback(container) {
    Component.call(this, container);
}

Feedback.prototype = Object.create(Component.prototype);
Feedback.prototype.constructor = Feedback;

Feedback.prototype.setMessage = function (message) {
    this.container.innerText = message;
};