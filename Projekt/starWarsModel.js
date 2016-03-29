var StarWarsModel = function() {
	var observersArray = [];

	var whoAmI = {"sum": [0], "name": []};
	var profile = {"name": ["Lucky Luke"], "eye": ["blue"], "hair": ["blond"], "height": [156]};

	this.addObserver = function(observer){
		observersArray.push(observer);
	}

	this.notifyObservers = function(obj){
		for(var i=0; i<observersArray.length; i++){
			observersArray[i].update(obj);
		}
	}

	this.returnWhoIAm = function(){
		return whoAmI
	}

	this.addToProfile = function(){
	// Samma för alla eller olika, input etc etc etc 
	}
	this.getPerson = function() {

		var url = "http://swapi.co/api/people/";
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


	this.findPlanet = function(){

	}
	this.matchMaking = function(personList){
		var sum = 0; 
		for(x = 0; x < 10; x++){
		if(personList[x].eye_color == profile.eye){
			sum += 1;
		}
		if(personList[x].name == profile.name){
			sum += 1;
		}
		if(personList[x].hair_color == profile.hair){
			sum += 1;
		}
		if(personList[x].heigth == profile.height){
			sum += 1;
		}

		if(whoAmI.sum < sum){
		whoAmI.sum = sum;
		whoAmI.name = personList[x];
		}
		sum = 0;
	}
		console.log(whoAmI.name);

	}
};