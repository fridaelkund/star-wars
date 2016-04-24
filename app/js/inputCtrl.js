StarWarsApp.controller('inputCtrl', function($scope, $location, StarModel){

// ------------- storing data -----------------

$scope.location = window.location;
// Get list of hair and eye colors, in the form colors: hex-col
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

// ------------- Avatar -----------------

// Check if hair, eye, length and name in profile allready. 
// If so, get values from profile and updating SVG: 
// Else, default values/empty values.
$scope.getAvatar = function(){
	$scope.profil = StarModel.returnProfile()

	if($scope.profil.hair == ""){}
	else{
		$scope.avatar_hair = $scope.profil.hair;
		$scope.avatar_hairhex = StarModel.haircol[$scope.profil.hair];
	};

	if($scope.profil.eye == ""){}
	else{
		$scope.avatar_eye = $scope.profil.eye;
		$scope.avatar_eyehex = StarModel.eyecol[$scope.profil.eye]	
	};

	if($scope.profil.height == ""){
		$scope.avatar_height = 150;
	}
	else{
		$scope.avatar_height = $scope.profil.height;	
	};

	if($scope.profil.name == ""){
		$scope.avatar_name = "Jedi";
	}
	else{
		$scope.avatar_name = $scope.profil.name;	
};
}

// Displaying name
$scope.showName = function(name){
	$scope.avatar_name = name;
}
//Displaying hair
$scope.showHair=function(color){
	$scope.avatar_hair = color;
	$scope.avatar_hairhex = StarModel.haircol[color];
}
//Displaying eye color
$scope.showEye=function(eye){
	$scope.avatar_eye = eye;
	$scope.avatar_eyehex = StarModel.eyecol[eye];
}

//Displaying height
$scope.showHeight=function(height){
	document.querySelector('#height').value = height;
	$scope.avatar_height = height;
}


// ------------- Profile -----------------

// When selecting character from local storage, getting the profile-attributes, adding them to profile
// and matchmaking.
$scope.getProfile=function(loc){
	StarModel.clearProfile();
	StarModel.addToProfile('name', loc.name);
	StarModel.addToProfile('hair', loc.hair);
	StarModel.addToProfile('eye', loc.eye);	
	StarModel.addToProfile('height', loc.height);
	
	for(i in loc.wonPlanets){
		StarModel.addToProfile('wonPlanets',loc.wonPlanets[i]);
	};
	for(j in loc.lostPlanets){
		StarModel.addToProfile('lostPlanets',loc.lostPlanets[j]);
	};

	StarModel.matchMaking();

	$location.path("/profile");

	$scope.profil = StarModel.returnProfile();
	console.log($scope.profil);
};

// Saving profile to Star Model and localStorage 
$scope.saveProfile=function(){
	StarModel.addToProfile('name', $scope.avatar_name);
	StarModel.addToProfile('hair', $scope.avatar_hair);
	StarModel.addToProfile('eye', $scope.avatar_eye);	
	StarModel.addToProfile('height', $scope.avatar_height);
	StarModel.saveLocalStorage();
	StarModel.matchMaking();
	
}

//Saves profile to localStorage and then clears profile-array
$scope.clearPreviousProfileData = function(){
	StarModel.saveLocalStorage();
	StarModel.clearProfile();

}

// ------------- localStorage -----------------

// Getting all characters from localStorage
$scope.getAllLocals = function(){
	if(StarModel.getLocalStorage().length == 0){
		$scope.allLocals = null;
	}
	else{
		$scope.allLocals = StarModel.getLocalStorage();
	}
};

// Deleting character, both from profile and local storage 
$scope.killChar=function(loc){
	localStorage.removeItem(loc.name);
	StarModel.clearProfile();
	$scope.allLocals = StarModel.getLocalStorage();
}

});

