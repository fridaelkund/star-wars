StarWarsApp.factory('StarModel',function ($resource){

	var whoAmI = {"sum": [0], "name": []};
	var profile = {"name": ["Lucky Luke"], "eye": ["blue"], "hair": ["blond"], "height": [156]};

	this.getPerson = $resource('http://swapi.co/api/people/');


	this.returnWhoIAm = function(){
		return whoAmI
	}

	this.addToProfile = function(){
	// Samma för alla eller olika, input etc etc etc 
	}


	this.findPlanet = function(){

	}
	this.matchMaking = function(){
		var personList = this.getPerson.results;
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

	return this;
});