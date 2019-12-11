"use strict"

/**
 * Component abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');

    this.container = container;
}

Component.prototype.show = function () {
    this.container.classList.remove('panel--hide');
    this.container.classList.add('panel--show');
};

Component.prototype.hide = function () {
    this.container.classList.remove('panel--show');
    this.container.classList.add('panel--hide');
};

Component.prototype.resetInputs = function(){
    var inputs = this.container.getElementsByTagName("input");
    for(var i = 0 ; i<inputs.length ; i++){
        inputs[i].value='';
    };
};