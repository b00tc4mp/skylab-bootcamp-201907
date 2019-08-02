

class Component{
    constructor(container){
        if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement')
        this.container=container
    }
    show(){
        this.container.classList.remove('hide')
        this.container.classList.add('show')
    }
    hide(){
        this.container.classList.remove('show')
        this.container.classList.add('hide')
    }
}


/**
 * Component abstraction.
 * 
 * @param {HTMLElement} container 
 */
/* function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');

    this.container = container;
}

Component.prototype.show = function () {
    this.container.classList.remove('hide');
    this.container.classList.add('show');
};

Component.prototype.hide = function () {
    this.container.classList.remove('show');
    this.container.classList.add('hide');
}; */