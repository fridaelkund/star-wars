StarWarsApp.factory('StarModel',function ($resource){

	var whoAmI = {"sum": [0], "person": [], "proc": 0};
	var profile = {"name": "", "eye": "", "hair": "", "height": ""};

	this.getPerson = $resource('http://swapi.co/api/people/');


	this.returnWhoIAm = function(){
		console.log("innan return who", whoAmI);
		return whoAmI.person
	}

	this.addToProfile = function(field, value){
		profile[field] = value;
		console.log(profile[field])
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
		console.log("profil innan match", profile);
		console.log("2", personList);
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
		console.log(whoAmI.proc);
		console.log("sum", sum);
		}
		sum = 0;
	}
		console.log("profil",profile);
		console.log(whoAmI.person);

	}
		

	this.getProcent = function(){
		console.log("pp", whoAmI.proc)
		return whoAmI.proc

	}

	this.returnPerson=function(){
		return this.getPerson;
	}

	return this;
});