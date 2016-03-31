StarWarsApp.factory('StarModel',function ($resource){

	var whoAmI = {"sum": [0], "person": []};
	var profile = {"name": ["Lucky Luke"], "eye": ["blue"], "hair": ["blond"], "height": [156]};

	this.getPerson = $resource('http://swapi.co/api/people/');


	this.returnWhoIAm = function(){
		return whoAmI.person
	}

	this.addToProfile = function(field, value){
		profile[field] = value;
		console.log(profile[field])
	}

	this.returnProfile = function(){
		console.log(profile);
	}


	this.findPlanet = function(){
	}

	this.matchMaking = function(personList){
		
		console.log("2", personList);
		var sum = 0; 
		for(x in personList){
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
		whoAmI.person = personList[x];
		}
		sum = 0;
	}
		console.log(whoAmI.person);

	}

	this.find_hair = function(personList){
		console.log(personList)
		var hairlist = []; 
		for(x in personList){
			console.log(personList[x].hair_color);
			}
		}
		

	this.returnPerson=function(){
		return this.getPerson;
	}

	return this;
});