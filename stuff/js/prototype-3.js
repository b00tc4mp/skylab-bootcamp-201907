function Person(name, age) {
    this.name = name;
    this.age = age;
    //this.info = function() { return this.name + ' ' + this.age; };
  }
  
  Person.prototype.info = function() { return this.name + ' ' + this.age; };
  
  var juan = new Person('Juan', 28);
  var pedro = new Person('Pedro', 23);
  
  //delete juan.info;
  //juan.info();
  //pedro.info();
  //juan.info === pedro.info
  
  //juan.info = function() { return this.age + ' ' + this.name; };
  //Person.prototype.info = function() { return this.age + ' ' + this.name; };
  juan.info();
  pedro.info();