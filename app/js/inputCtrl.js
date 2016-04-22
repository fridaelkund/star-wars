StarWarsApp.controller('inputCtrl', function($scope, $location, StarModel){

// Get list of hair and eye colors, in the form colors: hex-col
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

$scope.location = window.location;

// Check if hair, eye, length and name in profile allready. 
// I so, get values from profile and updating SVG: 
// Else, default values/empty values.

if(StarModel.returnProfile().hair == ""){}
else{
	$scope.avatar_hair = StarModel.returnProfile().hair;
	$scope.avatar_hairhex = StarModel.haircol[StarModel.returnProfile().hair];
};

if(StarModel.returnProfile().eye == ""){}
else{
	$scope.avatar_eye = StarModel.returnProfile().eye;
	$scope.avatar_eyehex = StarModel.eyecol[StarModel.returnProfile().eye]	
};

if(StarModel.returnProfile().height == ""){
	$scope.avatar_height = 100;
}
else{
	$scope.avatar_height = StarModel.returnProfile().height;	
};

if(StarModel.returnProfile().name == ""){
	$scope.avatar_name = "Jedi";
}
else{
	$scope.avatar_name = StarModel.returnProfile().name;	
};

// Saving profile to Star Model.
$scope.save=function(){
	StarModel.addToProfile('name', $scope.avatar_name);
	StarModel.addToProfile('hair', $scope.avatar_hair);
	StarModel.addToProfile('eye', $scope.avatar_eye);	
	StarModel.addToProfile('height', $scope.avatar_height);
	StarModel.saveLocalStorage();
	StarModel.matchMaking();
}

// Displaying name, hair, eye and length.
$scope.showName = function(name){
	$scope.avatar_name = name;
}

$scope.showHair=function(color){
	$scope.avatar_hair = color;
	$scope.avatar_hairhex = StarModel.haircol[color];
}

$scope.showEye=function(eye){
	$scope.avatar_eye = eye;
	$scope.avatar_eyehex = StarModel.eyecol[eye];
}

$scope.showHeight=function(height){
	document.querySelector('#height').value = height;
	$scope.avatar_height = height;
}

$scope.inputName=function(query){
	if(query==null){
		return
	}
	else{
	StarModel.addToProfile('name', query)
	}
}

$scope.getAllLocals = function(){
	$scope.allLocals = StarModel.getLocalStorage();
};

// When selecting char from local storage, getting attributes, adding to profile
// and matchmaking.
$scope.getProfile=function(loc){
	StarModel.clearAll();
	StarModel.addToProfile('name', loc.name);
	StarModel.addToProfile('hair', loc.hair);
	StarModel.addToProfile('eye', loc.eye);	
	StarModel.addToProfile('height', loc.height);
	for(i in loc.wonPlanets){
		StarModel.addWonPlanet(loc.wonPlanets[i])
	};
	for(i in loc.lostPlanets){
		StarModel.addLostPlanet(loc.lostPlanets[i])
	};
	StarModel.matchMaking();
	$location.path("/profile");
};

});

