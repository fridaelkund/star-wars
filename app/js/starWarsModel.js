StarWarsApp.factory('StarModel',function ($resource, $http, $q){
	
	var habitantsOnPlanets = [];
	if(JSON.parse(localStorage.getItem("planeter")) !== null){
		habitantsOnPlanets = JSON.parse(localStorage.getItem("planeter"));
	}

	var lookAlikes = [];
	var profile = {"name": "", "eye": "", "hair": "", "height": "", "wonPlanets": [], "lostPlanets": []};

	var wonPlanets = [];
	var lostPlanets = [];


	var tempData = [];
	var q = null; // The deferrer object which we define later.

    // The main function which builds the tempData
    // variable from the _previous_ call!
    var fetchFromUrl = function(url, data) {
        if (data !== null) {
        	console.log("Adding data to tempData:", data);
        	tempData = tempData.concat(data);
        }
        // Make request! (Jedi style preferably)
        var tempReq = $http({
        	method: 'GET',
        	url: url
        });
        // We must wait for the response as we need the next url!
        tempReq.then(function successCallback(response) {
        	var results = response.data.results;
        	console.log("Got this data:", results);

        	// Check if we have a next page
        	if (response.data.next !== null) {
			// Oh yes. We have data. Big data.
			console.log("More is available at", response.data.next);
			// Call again with the results as data input to build the
			// tempData result array with
			fetchFromUrl(response.data.next, results);
		} else {
			// We have no more data to fetch! Resolve the promise.
			// (The wookie has served us all data we need. We thank
			// him/her and tell our system that the data is ready!)
        	console.log("No more data!", tempData);
        	q.resolve(tempData);
        }
        });
       };
        
    this.fetchAll = function(url) {
        data = []; // Reset the array.
        q = $q.defer(); // Defined it!

        // Start with null as data!
        fetchFromUrl(url, null);
        console.log(q.promise)
        return q.promise;
       };

    this.addPlanets = function(planets){
    	console.log("Time to addPlanets")
    	for(i in planets){
    		habitantsOnPlanets.push({"planet": planets[i], "habitants": []})
    	}
    	console.log("All planets:", habitantsOnPlanets)
    }

    this.addPeople = function(people){
    	console.log("Time to addPeople")
    	for(i in people){
    		for(j in habitantsOnPlanets){
    			if(people[i].homeworld == habitantsOnPlanets[j].planet.url){
    				habitantsOnPlanets[j].habitants.push(people[i]);
    			}
    		}
    	}
    	console.log("All planets have habitants!", habitantsOnPlanets)
    }

	this.getPlanets = $resource("http://swapi.co/api/planets/");
	this.getCharacter = $resource("http://swapi.co/api/people/");


	this.returnHabitantsOnPlanets = function(planets){
		return habitantsOnPlanets;
	}

	// Matchar profil med starwars-karaktärer och ju fler liknande 
	//karaktärsdrag desto fler poäng samlas

	this.matchMaking = function(){
		//console.log("Start match making!", habitantsOnPlanets)
		for(i in habitantsOnPlanets){
			//console.log("In habitants on planets", habitantsOnPlanets[i])
			var tempPerson= null
			var tempPoints = 0
			
			for(j in habitantsOnPlanets[i].habitants){
				//console.log("In habitants")
				var lookAlikePoints = 0;
				
				if(habitantsOnPlanets[i].habitants[j].eye_color == profile.eye){
					lookAlikePoints += 1;
				}
				if(habitantsOnPlanets[i].habitants[j].name == profile.name){
					lookAlikePoints += 1;
				}
				if(habitantsOnPlanets[i].habitants[j].hair_color == profile.hair){
					lookAlikePoints += 1;
				}
				if(habitantsOnPlanets[i].habitants[j].height == profile.height){
					lookAlikePoints += 1;
				}
				
				//console.log(lookAlikePoints);

				if(tempPoints < lookAlikePoints){
					tempPerson = habitantsOnPlanets[i].habitants[j];
					tempPoints = lookAlikePoints;
				}
			}

			habitantsOnPlanets[i].lookAlike = {"bestMatch":tempPerson, "points":(tempPoints/=4)*100};	
		}
		//console.log("We have a match", habitantsOnPlanets)
	};


	this.addWonPlanet = function(planet){
		console.log("planet innan add to won Planets", planet);
		console.log("profile.wonplanet innan add to won Planets", profile);
	
		profile.wonPlanets.push(planet);
		console.log("wonplanets efter add", profile.wonPlanets);
	}

	this.addLostPlanet= function(planet){
		profile.lostPlanets.push(planet)
	}


	this.addToProfile = function(field, value){
		profile[field] = value;
	};

	this.returnProfile = function(){
		return profile;
	}

	this.clearAll = function(){
	profile = {"name": "", "eye": "", "hair": "", "height": "", "wonPlanets": [], "lostPlanets": []};
	}

	//Returnerar lista med planeter som spelaren vunnit
	this.returnWonPlanets = function(){
		//console.log("model", profile.wonPlanets);
		return profile.wonPlanets;
	}

	this.returnLostPlanets = function(){
		return profile.lostPlanets;
	}


	this.savePlanets = function(){
		var temp = JSON.parse(localStorage.getItem(profile.name));
	
		if(profile.wonPlanets ==! null){
		temp.wonPlanets = profile.wonPlanets;};

		if(profile.lostPlanets==! null){
		temp.lostPlanets = profile.lostPlanets;};
		
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
			console.log('loopar igenom', i);
			if(i === "planeter"){
				console.log('planet')
		}else{
			allLocals.push(JSON.parse(localStorage.getItem([i])));
		}
		}
		return allLocals;
	}

	this.saveLocalStorage = function(){
		if(profile.name ==! ''){
		localStorage.setItem(profile.name, JSON.stringify(profile));
		};
	}

	this.savePlanetsLocalStorage = function(){
		localStorage.setItem("planeter", JSON.stringify(habitantsOnPlanets));
	};

	this.getPlanetsFromLocal = function(){
		habitantsOnPlanets = JSON.parse(localStorage.getItem("planeter"));
	};

	this.checkLocalStorage = function(){
		if(JSON.parse(localStorage.getItem("planeter")) === null){
			return false
		}
		else{
			return true
		}
	};

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