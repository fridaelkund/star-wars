StarWarsApp.factory('StarModel',function ($resource, $http){

	var whoAmI = {"sum": [0], "person": [], "proc": 0};
	var profile = {"name": "", "eye": "", "hair": "", "height": ""};

	this.getPerson = $resource('http://swapi.co/api/people/');


	this.returnWhoIAm = function(){
		return whoAmI.person
	}

	this.addToProfile = function(field, value){
		profile[field] = value;
	}

	this.returnProfile = function(){
		return profile;
	}

	this.clearAll = function(){
	whoAmI = {"sum": [0], "person": []};
	profile = {"name": "", "eye": "", "hair": "", "height": ""};
	}

	this.findPlanet = function(){
	}

	this.matchMaking = function(personList){
		var sum = 0; 
		for(x=0; x<10; x++){
		if(personList[x].eye_color == profile.eye){
			sum += 1;
		}
		if(personList[x].name == profile.name){
			sum += 1;
		}
		if(personList[x].hair_color == profile.hair){
			sum += 1;
		}
		if(personList[x].height == profile.height){
			sum += 1;
		}
		if(whoAmI.sum <= sum){
		whoAmI.sum = sum;
		whoAmI.person = personList[x];
		whoAmI.proc = (sum /= 4) *100;
		}
		sum = 0;
	$http.get(personList[x].homeworld).then(function(data){
		console.log("JA", data.data.name)}, function(data){ 
		console.log("NEJ", data)
	});
	
	}
}
	this.getProcent = function(){
		return whoAmI.proc
	}

	this.returnPerson=function(){
		return this.getPerson;
	}

	return this;
});