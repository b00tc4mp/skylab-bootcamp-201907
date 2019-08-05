function person(name) {
	return function(comment) {
		console.log(name + ': ' + comment);
    }
}

var john = person('John');
var mary = person('Mary');

john('hello, mary!');
mary('hi, john!');
john('how are you?');
mary('fine, and you?');
john('fucked with the closures');