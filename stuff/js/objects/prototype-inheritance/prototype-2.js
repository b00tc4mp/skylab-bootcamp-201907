function Product(name, price) {
	this.name = name; this.price = price;
}

Product.prototype.info = function() {
	return this.name + " " + this.price + '€';
};

var rubberMug = new Product('Caro Mug', 12);
var laptopStand = new Product('Lluisy Stand', 26);
var duffBeer = new Product('Duff Beer', 5);
var anfetaMines = new Product('Push Energy Up', 40);
var freakieSticker = new Product('Freakie Sticker 2019', 1);
var hdmiCable = new Product('HDMI Cable', 15);

var products = [
    rubberMug,
    laptopStand,
    duffBeer,
    anfetaMines,
    freakieSticker,
    hdmiCable
];

products.forEach(function(product) { console.log(product.info()); });

function Cart() {
    this.products = [];
}

Cart.prototype.add = function(product) { this.products.push(product); };
Cart.prototype.remove = function(product) { 
    var index = this.products.indexOf(product);

    this.products.splice(index, 1);
};
Cart.prototype.total = function() { 
    return this.products.reduce(function(accum, product) {
        return accum + product.price;
    }, 0) + '€';
};

var cart = new Cart();

cart.add(hdmiCable);
cart.add(anfetaMines);
console.log(cart.total());

cart.remove(hdmiCable);
console.log(cart.total());

cart.add(laptopStand);
cart.add(laptopStand);
cart.add(laptopStand);
console.log(cart.total());

cart.remove(laptopStand);
cart.remove(laptopStand);
console.log(cart.total());





