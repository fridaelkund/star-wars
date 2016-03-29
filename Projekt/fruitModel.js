var FruitModel = function() {
	var observersArray = [];


	this.addObserver = function(observer){
		observersArray.push(observer);
	}

	this.notifyObservers = function(obj){
		for(var i=0; i<observersArray.length; i++){
			observersArray[i].update(obj);
		}
	}


	this.getFruit = function (id) {

		var url = "http://swapi.co/api/people/"+id+"/" 

		var model = this; 

		$.ajax({
			type: "GET",
			url: url,
			ContentType:'application/json',
			success: function(data){
				model.notifyObservers(data);

			},
			error: function(e){
				console.log(e);
				model.notifyObservers(e);
			}
		});
	};
};