StarWarsApp.factory('StarModel',function ($resource, $http, $q){

// ------------- storing data -----------------
	
	var habitantsOnPlanets = [];
	if(JSON.parse(localStorage.getItem("planeter")) !== null){
		habitantsOnPlanets = JSON.parse(localStorage.getItem("planeter"));
	}
	
	var profile = {"name": "", "eye": "", "hair": "", "height": "", "wonPlanets": [], "lostPlanets": []};
	var tempData = [];
	var q = null; // The deferrer object


// ------------- Fetching data from API -----------------
    // The main function which builds the tempData
    // variable from the _previous_ call!
    var fetchFromUrl = function(url, data) {
        if (data !== null) {
        	tempData = tempData.concat(data);
        }
        
        var tempReq = $http({
        	method: 'GET',
        	url: url
        });
        // We must wait for the response
        tempReq.then(function successCallback(response) {
        	var results = response.data.results;

        	// Check if we have a next page
        	if (response.data.next !== null) {

			fetchFromUrl(response.data.next, results);
		} else {
			// We have no more data to fetch! Resolve the promise.
        	q.resolve(tempData);
        }
        });
       };
        
    this.fetchAll = function(url) {
        data = []; // Reset the array.
        q = $q.defer(); // Defined it!

        // Start with null as data!
        fetchFromUrl(url, null);
        return q.promise;
       };


// ------------- habitantsOnPlanets modification -----------------

	//adds all fetched planets in the array habitantsOnPlanets to store them there
    this.addPlanets = function(planets){
    	for(i in planets){
    		habitantsOnPlanets.push({"planet": planets[i], "habitants": []});
    	}
    }

    //Adds all fetched people in the array habitantsOnPlanets sorted by the planet they live at
    this.addPeople = function(people){
    	for(i in people){
    		for(j in habitantsOnPlanets){
    			if(people[i].homeworld == habitantsOnPlanets[j].planet.url){
    				habitantsOnPlanets[j].habitants.push(people[i]);
    			}
    		}
    	}
    }


    //Returns habitantsOnPlanets
	this.returnHabitantsOnPlanets = function(planets){
		return habitantsOnPlanets;
	}


// ------------- Setup for game and gaming-function -----------------

	//For each planet this function matches the planets habitants with the users profile 
	// and adds the points to tempPoints. Then a 'bestMatch' is being added to habitantsOnPlanets
	//saying which habitant on that planet the user is most alike
	this.matchMaking = function(){
		for(i in habitantsOnPlanets){
			var tempPerson= null;
			var tempPoints = 0;
			
			for(j in habitantsOnPlanets[i].habitants){
				
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

				if(tempPoints < lookAlikePoints){
					tempPerson = habitantsOnPlanets[i].habitants[j];
					tempPoints = lookAlikePoints;
				}
			}
			habitantsOnPlanets[i].lookAlike = {"bestMatch":tempPerson, "points":(tempPoints/=4)*100};	
		}
		
	};

	//Gaming-function that determains weather or not the user wins using the odds of winning as input
	this.compete = function(proc){
		var yourOdds = proc / 100;
		var results = [1, 0]; 
		var computersOdds = Math.random();
	
		if(computersOdds<yourOdds){
			return results[0];
		}			
		return results[1];
	}


// ------------- Profile -----------------

	//Function that adds values to the users profile 
	this.addToProfile = function(field, value){
		if(field == 'wonPlanets' || field == 'lostPlanets'){
			profile[field].push(value);
		}
		else{
		profile[field] = value;
		}
	};

	//Returns the profile-array
	this.returnProfile = function(){
		return profile;
	}

	//Function that clears the profile
	this.clearProfile = function(){
	profile = {"name": "", "eye": "", "hair": "", "height": "", "wonPlanets": [], "lostPlanets": []};
	}


// ------------- localStorage -----------------
	
	// ---- profile localStorage ----


	//Fetches profiles from localStorage
	this.getLocalStorage = function(){
		var allLocals = [];
		for(i in localStorage){
			if(i !== "planeter"){
				allLocals.push(JSON.parse(localStorage.getItem([i])));
			}
		}
		return allLocals;
	}

	//Saves whole profile to localStorage
	//this function removes the current data for the profile and replaces 
	//it with a new to make sure the data stays up to date with the users changes
	this.saveLocalStorage = function(){
		if(profile.name == ""){
			localStorage.removeItem(profile.name);
		}
		else{
			localStorage.removeItem(profile.name);
			localStorage.setItem(profile.name, JSON.stringify(profile));
		}
	}

	// ---- habitantsOnPlanets localStorage ----

	this.getPlanetsFromLocal = function(){
		habitantsOnPlanets = JSON.parse(localStorage.getItem("planeter"));
	};

	//Saves habitantsOnPlanets to localStorage
	this.savePlanetsLocalStorage = function(){
		localStorage.setItem("planeter", JSON.stringify(habitantsOnPlanets));
	};

	//Checks if habitantsOnPlanets already exists in localStorage 
	//If so 'true' is returned, else 'false' is returned
	this.checkLocalStorage = function(){
		if(JSON.parse(localStorage.getItem("planeter")) === null){
			return false
		}
		else{
			return true
		}
	};

// ------------- small database -----------------

	//Our own database with eyecolors
	this.eyecol = 
		{"blue": "#1a75ff", 
		"yellow": "#ffff4d", 
		"red": "#ff471a", 
		"brown":"#734d26", 
		"blue-gray":"#8cb3d9"};
		
	//Our own database with haircolors
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