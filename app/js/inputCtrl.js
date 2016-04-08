StarWarsApp.controller('inputCtrl', function($scope, StarModel){

// Hämtar lista på färger med namn:hex
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

$scope.location = window.location;

console.log($scope.location);

// Kollar om det finns ögonfärg, hårfärg och längd i profilen redan.
// Lägger defaultvärden om så är fallet, annars hämtar värden från profil och uppdaterar i SVGn.

if(StarModel.returnProfile().hair == ""){
	$scope.temp_hairhex = "none";
}
else{
	$scope.temp_hair = StarModel.returnProfile().hair;
	$scope.temp_hairhex = StarModel.haircol[StarModel.returnProfile().hair];
};

if(StarModel.returnProfile().eye == ""){}
else{
	$scope.temp_eye = StarModel.returnProfile().eye;
	$scope.temp_eyehex = StarModel.eyecol[StarModel.returnProfile().eye]	
};

if(StarModel.returnProfile().height == ""){
	$scope.temp_height = 100;
	$scope.temp_feet = $scope.temp_height+180;
}
else{
	$scope.temp_height = StarModel.returnProfile().height;	
	$scope.temp_feet = parseInt($scope.temp_height)+180;
};

if(StarModel.returnProfile().name == ""){
	$scope.temp_name = "Snickers";
}
else{
	$scope.temp_name = StarModel.returnProfile().name;	
};

// Funktion för att spara sin profil. Uppdaterar profile i model. 

$scope.save=function(){
	StarModel.addToProfile('name', $scope.temp_name);
	StarModel.addToProfile('hair', $scope.temp_hair);
	StarModel.addToProfile('eye', $scope.temp_eye);	
	StarModel.addToProfile('height', $scope.temp_height);
	StarModel.saveLocal();
	$scope.match();
}

// Visar valt namn, hår/ögonfärg eller längd. Sparar ej i profil. 

$scope.showName = function(name){
	$scope.temp_name = name;
}

$scope.showHair=function(color){
	$scope.temp_hair = color;
	$scope.temp_hairhex = StarModel.haircol[color];
}

$scope.showEye=function(eye){
	$scope.temp_eye = eye;
	$scope.temp_eyehex = StarModel.eyecol[eye];
}

$scope.showHeight=function(height){
	document.querySelector('#height').value = height;
	$scope.temp_height = height;
	$scope.temp_feet = parseInt(height)+180;
}

// Matchingsfunktion som kollar vem man är lik av Star Wars-gubbarna. 

$scope.match=function(){
	console.log("start");
	StarModel.getPerson.get({},function(data){
		$scope.person=data.results;
		StarModel.matchMaking($scope.person);
		$scope.whoAmI=StarModel.returnWhoIAm();
		$scope.proc = StarModel.getProcent();
		console.log("match")
	}, function(data){
		console.log("Match error");
	});	
}

$scope.inputName=function(query){
	if(query==null){
		return ;
	}
	else{
	StarModel.addToProfile('name', query)
	}
}


});

