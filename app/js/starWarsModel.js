StarWarsApp.factory('StarModel',function ($resource, $http){

	var whoAmI = [];
	var profile = {"name": "", "eye": "", "hair": "", "height": ""};
	var wonPlanets = [];
	var lostPlanets = [];
	var allPlanets = [];
	this.getPerson = $resource('http://swapi.co/api/people/');
	this.getPlanets = $resource("http://swapi.co/api/planets/");


	this.returnWhoIAm = function(){
		return whoAmI
	}
	this.returnPlanets = function(){
		return allPlanets;
	}

	this.addToProfile = function(field, value){
		profile[field] = value;
	}

	this.returnProfile = function(){
		return profile;
	}

	this.clearAll = function(){
	whoAmI = {"sum": [0], "person": "", "proc":0, "planet": ""};
	profile = {"name": "", "eye": "", "hair": "", "height": ""};
	wonPlanets = [];
	lostPlanets = [];
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
		
		whoAmI.push({"sum": sum, "person": personList[x], "proc": (sum/=4)*100});
	
		console.log(whoAmI);
		sum = 0;
	
		}
	}
	this.planetMatch = function(){
		for(x=0; x<whoAmI.length; x++){
			$http.get(whoAmI[x].person.homeworld).then(function(data){
				//bor någon matchad person på den här planet?
				//om ja
			allPlanets.push({"planetName":data.data.name});
			//om inte
			//kill planet
			}, function(data){ 
			});
		}
	}
	this.getProcent = function(){
		return whoAmI.proc
	}

	this.returnPerson=function(){
		return this.getPerson;
	}
	//Lägger till planet i "planeter som spelaren har vunnit"
	this.addWonPlanet = function(planet){
		wonPlanets.push({"name":planet.name});
	}

	this.addLostPlanet= function(planet){
		lostPlanets.push({"name":planet.name})
	}

	//Returnerar lista med planeter som spelaren vunnit
	this.returnWonPlanets = function(){
		return wonPlanets;
	}

	this.returnLostPlanets = function(){
		return lostPlanets;
	}


	this.savePlanets = function(){
		var temp = JSON.parse(localStorage.getItem(profile.name));
		temp["wonPlanets"] = wonPlanets;
		temp["lostPlanets"] = lostPlanets;
		localStorage.setItem(profile.name, JSON.stringify(temp));		
	}

// Tävlingsfunktion som avgör om spelaren vinner eller inte
	this.compete = function(proc){
		var yourOdds = proc / 100;
		var results = [1, 0]; 
		var computersOdds = Math.random();
	
		if(computersOdds<yourOdds){
			return results[0];
		}			
		return results[1];
		}

// Sparar och hämtar alla lokalt sparade profiler 

	this.getLocalProfiles = function(){
		var allLocals = [];
		for(i in localStorage){
			allLocals.push(JSON.parse(localStorage.getItem([i])));
		}
		return allLocals;
	}

	this.saveLocalProfile = function(){
		localStorage.setItem(profile.name, JSON.stringify(profile));
	}

	this.eyecol = 
		{"blue": "#1a75ff", 
		"yellow": "#ffff4d", 
		"red": "#ff471a", 
		"brown":"#734d26", 
		"blue-gray":"#8cb3d9"};
	this.haircol = 
		{"blond": "#ffdf80" , 
		"n/a": "#ff8080", 
		"none": "#ff6600", 
		"brown": "#4d2600", 
		"grey": "#8c8c8c", 
		"black":"#000000", 
		"auburn": "#993300", 
		"white": "#ffffff"}

	return this;
});