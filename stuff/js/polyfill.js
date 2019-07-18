if (typeof Array.prototype.random === 'undefined')
    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
    };

var a = [1, 2, 3, 4, 5];

a.random();
a.random();
a.random();
a.random();
a.random();