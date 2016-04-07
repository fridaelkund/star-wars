StarWarsApp.factory('StarModel',function ($resource, $http){

	var whoAmI = {"sum": [0], "person": "", "proc": 0, "planet": "Alderaan"};
	var profile = {"name": "", "eye": "", "hair": "", "height": ""};

	this.getPerson = $resource('http://swapi.co/api/people/');
	this.getPlanets = $resource("http://swapi.co/api/planets/");

	this.eyecol = {"blue": "#1a75ff", "yellow": "#ffff4d", "red": "#ff471a", "brown":"#734d26", "blue-gray":"#8cb3d9"};
	this.haircol = {"blonde": "#ffdf80" , "n/a": "#ff8080", "none": "#ff6600", "brown": "#4d2600", "grey": "#8c8c8c", "black":"#000000", "auburn": "#993300", "white": "#ffffff"}

	this.returnWhoIAm = function(){
		return whoAmI
	}

	this.addToProfile = function(field, value){
		profile[field] = value;
	}

	this.returnProfile = function(){
		return profile;
	}

	this.clearAll = function(){
	whoAmI = {"sum": [0], "person": "", "proc":0, "planet": "Alderaan"};
	profile = {"name": "", "eye": "", "hair": "", "height": ""};
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
		whoAmI.proc = (sum /= 4) * 100;
		}
		sum = 0;
		
		$http.get(personList[x].homeworld).then(function(data){
		whoAmI.planet = data.data.name;
		}, function(data){ 
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