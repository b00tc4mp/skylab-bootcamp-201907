    'use strict'

    function arrayFrom(item, mapFunction) {
        var output = [];
        if (arguments.length === 0) throw TypeError('missing first argument (array)');
        if (arguments.length === 2 && !(mapFunction instanceof Function)) throw TypeError(mapFunction + ' is not a function');

        if (arguments.length === 2) for (var i = 0; i < item.length; i++) output.push(mapFunction(item[i]));
        else for (var i = 0; i < item.length; i++) output.push(item[i]);
        return output;
    }