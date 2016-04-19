StarWarsApp.factory('StarModel',function ($resource, $http){

	var lookAlikes = [];
	var profile = {"name": "", "eye": "", "hair": "", "height": ""};
	var wonPlanets = [];
	var lostPlanets = [];
	var allPlanets = [];

 this.getP = function(nr){
	 var getPerson = $resource(nr);
	 return getPerson 
	 };

	this.getPlanets = $resource("http://swapi.co/api/planets/");
	this.getCharacter = $resource("http://swapi.co/api/people/");


	this.planetandperson = function(planets){
		for(x=0; x<lookAlikes.length; x++){
			for(i=0; i<planets.length; i++){
			if(lookAlikes[x].person.homeworld == planets[i].url){
				console.log("match")
				lookAlikes[x].planet = planets[i].name
			}	
			else{
				lookAlikes[x].planet = "No planet"
			}

			}
		}
	console.log(lookAlikes);
	} 

	this.returnlookAlikes = function(){
		return lookAlikes;
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
	lookAlikes = [];
	profile = {"name": "", "eye": "", "hair": "", "height": ""};
	wonPlanets = [];
	lostPlanets = [];
	allPlanets = [];

	}

	// Matchar profil med starwars-karaktärer och ju fler liknande 
	//karaktärsdrag desto fler poäng samlas
	this.matchMaking = function(allCharacter){
		var lookAlikePoints = 0; 
		for(x=0; x<allCharacter.length; x++){
		if(allCharacter[x].eye_color == profile.eye){
			lookAlikePoints += 1;
		}
		if(allCharacter[x].name == profile.name){
			lookAlikePoints += 1;
		}
		if(allCharacter[x].hair_color == profile.hair){
			lookAlikePoints += 1;
		}
		if(allCharacter[x].height == profile.height){
			lookAlikePoints += 1;
		}
		
		//SE ÖVER DETTA, går det att lägga planet i lookAlikes istället?
		lookAlikes.push({"person": allCharacter[x], "proc": (lookAlikePoints/=4)*100});
		lookAlikePoints = 0;
		}
	}

	this.HEJ = function(){
		for(x=0; x<lookAlikes.length; x++){
		lookAlikes[x].planet = allPlanets[x];
		}
	};

	this.returnProcent = function(){
		return lookAlikes.proc;
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

	this.getLocalStorage = function(){
		var allLocals = [];
		for(i in localStorage){
			allLocals.push(JSON.parse(localStorage.getItem([i])));
		}
		return allLocals;
	}

	this.saveLocalStorage = function(){
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