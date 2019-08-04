var query = 'orange';

var request = new XMLHttpRequest()

request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query);

request.onload = function() {
	var results = JSON.parse(request.responseText);

	var ul = document.createElement('ul');

	document.body.appendChild(ul);
	
	//console.log(results);
	results.forEach(function(item) { 
		//console.log(item.title, item.imageUrl);

		var li = document.createElement('li');

		var h3 = document.createElement('h3');

		h3.innerText = item.title;

		li.appendChild(h3);

		var img = document.createElement('img');

		img.src = item.imageUrl;

		li.appendChild(img);

		ul.appendChild(li);
	});
};

request.send();