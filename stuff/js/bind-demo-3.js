var coords = {
	x: 10,
	y: 20,
	getX: function() {
		return this.x;
    },
	getY: function() {
		return this.y;
    }
};

//coords.getY(); // 20

var getY = coords.getY;
getY(); // undefined (FAIL context is window now)

//var getY = coords.getY.bind(coords);
//getY(); // 20

//var coords2 = { x: 100, y: 200 };
//var getY = coords.getY.bind(coords2);
//getY(); // 200

//var getY = coords.getY.bind({ y: 123 })
//getY(); // 123